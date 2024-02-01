import { pool } from "@/utils/dbConnect";
import dbCoonnect from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  dbCoonnect();
  const id = params.id;
  const data = await pool.query("SELECT * FROM credentials WHERE id=$1", [id]);
  const result = data.rows[0];

  async function updateCred(data) {
    "use server";
    let url = data.get("url").valueOf();
    let username = data.get("username").valueOf();
    let password = data.get("password").valueOf();
    try {
      const updateCred = await pool.query(
        "UPDATE credentials SET url=$1, username=$2, password=$3 WHERE id=$4",
        [url, username, password, id]
      );
      console.log("Credentials Updated" + updateCred);
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  }

  return (
    <main className="m-10">
      <div className="m-5">
        <h1 className="text-center m-5">Edit Credentails</h1>
        <form action={updateCred} className="space-y-5">
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Add URL"
            defaultValue={result.url}
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <input
            type="text"
            name="username"
            id="userame"
            placeholder="Add Username"
            defaultValue={result.username}
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Add Password"
            defaultValue={result.password}
            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
          />
          <button className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">
            Edit Credentails
          </button>
        </form>
      </div>
    </main>
  );
}
