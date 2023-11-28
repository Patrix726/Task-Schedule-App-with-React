// eslint-disable-next-line react/prop-types
const AddGroup = ({ addGroupRef, onClick }) => {
  return (
    //TODO: create a color selector as input
    <div className="group-name-input" ref={addGroupRef}>
      <input
        type="text"
        name="title"
        id="group-text-input"
        required
        placeholder="Enter Group Name"
        autoFocus
      />
      {/* <input type="image" name="icon" id="icon-input" /> */}
      <button onClick={onClick}>Add</button>
    </div>
  );
};

export default AddGroup;
