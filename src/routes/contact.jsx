import { Form, 
         useLoaderData,
         useFetcher,
} from "react-router-dom"
import { getContact, updateContact } from "../contacts"

/**
 * The function updates a contact's favorite status based on the value received from a form data.
 * @returns the result of the `updateContact` function call.
 */
export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

/**
 * The function exports an asynchronous loader that retrieves a contact based on the provided contactId
 * parameter.
 * @returns the result of the `getContact` function, which is likely an object representing a contact.
 */
export async function loader({ params }){
    return getContact(params.contactId)
}

/* The `export default function Contact()` is a React component that represents the contact details
page. It renders the contact's information, such as their avatar, name, Twitter handle, notes, and
options to edit or delete the contact. */
export default function Contact() {
  const contact = useLoaderData()

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

/**
 * The `Favorite` component renders a button that allows the user to add or remove a contact from their
 * favorites list.
 * @returns The code is returning a button element that allows the user to toggle the favorite status
 * of a contact. The button displays a star (★) if the contact is marked as a favorite, and a empty
 * star (☆) if it is not. The button is wrapped in a form element that uses the `fetcher` hook to
 * handle form submission.
 */
function Favorite({ contact }) {
  const fetcher = useFetcher()
  let favorite = contact.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}