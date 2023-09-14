import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

/**
 * This function deletes a contact and redirects to the homepage.
 * @returns a redirect to the root ("/") route.
 */
export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}