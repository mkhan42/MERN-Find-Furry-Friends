import "./UsersPage.css";
// import Api from "../../components/Api/Api"
import Places from "../../components/Api/map/AdressInput"

export default function UsersPage() {
  const today = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // "Friday, Jul 2, 2021"

  return (
    <>
      <h1>This is UsersPage - basic information</h1>
      <h2>{today}</h2>
      <h3>Name: </h3>
      <h3>Email: </h3>
      <h3>My Posts: ....eidt,delete</h3>
      {/* after mvp */}
      <h3>My comments: ...delete </h3>

      {/* if someone comment our post, we get notification... */}
      {/* <Api /> */}
      <Places />
      </>
  );
}
