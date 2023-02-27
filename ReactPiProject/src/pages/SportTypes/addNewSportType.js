
export default function NewSportType() {
  return (
    <>
      <h1>Create New Sport Type</h1>
      <form action="/send-data-here" method="post">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label for="subTypes">Sub types:</label>
        <input type="text" id="subTypes" name="subTypes" />
        <button type="submit">Submit</button>
       </form>
    </>
  )
}
