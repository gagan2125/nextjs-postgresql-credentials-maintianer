import Image from "next/image";
import { pool } from "@/utils/dbConnect";
import dbCoonnect from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function Home() {
  dbCoonnect();
  //CREATE

  async function createCredentials(data) {
    "use server";
    let url = data.get("url")?.valueOf();
    let username = data.get("username")?.valueOf();
    let password = data.get("password")?.valueOf();
    try {
      const newCred = await pool.query(
        "INSERT INTO credentials(url, username, password) VALUES($1, $2, $3) RETURNING *",
        [url, username, password]
      );
      console.log(newCred.rows[0]);
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  }

  //Read
  const data = await pool.query("SELECT * FROM credentials");
  const result = data.rows;

  //Delete
  async function deleteCred(data) {
    "use server";
    let id = data.get("id").valueOf();
    try {
      await pool.query("Delete FROM credentials WHERE id=$1", [id]);
      console.log("Credentials Deleted SuccessFully");
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  }

  return (
    <main className="m-10">
      <div className="m-5">
        <h1 className="text-center m-5">Add Credentails</h1>
        <form action={createCredentials} className="space-y-5">
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Add URL"
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <input
            type="text"
            name="username"
            id="userame"
            placeholder="Add Username"
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Add Password"
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <button className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">
            Add Credentails
          </button>
        </form>
      </div>
      {result.map((element) => {
        return (
          <>
            <ul key={element.id} className="flex my-2">
              <li className="text-center w-[30%]">{element.url}</li>
              <li className="text-center w-[30%]">{element.username}</li>
              <li className="text-center w-[20%]">{element.password}</li>
              <li className="flex text-center w-[20%]">
                <a href={"/edit/" + element.id}>
                  <button className="bg-cyan-600 font-bold text-white p-2">
                    Edit
                  </button>
                </a>
                <form action={deleteCred}>
                  <input type="hidden" name="id" value={element.id} />
                  <button className="bg-red-600 font-bold text-white p-2">
                    Delete
                  </button>
                </form>
              </li>
            </ul>
          </>
        );
      })}
    </main>
  );
}
