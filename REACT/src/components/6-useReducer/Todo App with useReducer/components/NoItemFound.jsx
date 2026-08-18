import NoItemsFoundImage from "../../../../assets/no-item-found.svg";
function NoItemsFound() {
  return (
    <div className="empty-state">
      <img src={NoItemsFoundImage}></img>

      <h2>No items found</h2>
      <p>There are no items to display.</p>
    </div>
  );
}

export default NoItemsFound;
