import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showfriendList, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleshowFriendList() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [newFriend, ...friends]);
    setShowAddFriend(false);
  }

  function handleSelectionFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelectionFriend}
          selectedFriend={selectedFriend}
        />

        {showfriendList && <AddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleshowFriendList}>
          {showfriendList ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend && selectedFriend.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}💵
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}💵
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ onAddFriend }) {
  // Add curly braces to properly destructure props
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=933372");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      balance: 0,
      image: `${image}?=${id}`,
    };
    setName("");
    setImage("https://i.pravatar.cc/48?u=933372");

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 🤫 Friend Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼Image URL</label>
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billAmount, setBillAmount] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = billAmount ? billAmount - userExpense : "";

  function handlesubmit(e) {
    e.preventDefault();
    if (!billAmount || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handlesubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>💰 Bill Amount</label>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
        placeholder="Bill Amount"
      />
      <label>🦹🏻 your expense</label>
      <input
        type="text"
        placeholder="expense %"
        value={userExpense}
        onChange={(e) => setUserExpense(e.target.value)}
      />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" placeholder="X %" disabled value={paidByFriend} />
      <label>🤑Who's paying the bill </label>
      <select
        value={whoIsPaying}
        onChange={(e) =>
          setWhoIsPaying(
            Number(e.target.value) > billAmount
              ? userExpense
              : Number(e.target.value)
          )
        }
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
