import { 
  Outlet, 
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom"
import { getContacts, createContact } from "../contacts"
import { useEffect } from "react"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts = await getContacts(q)
  return { contacts, q }
}

export async function action(){
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1><img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAiIGhlaWdodD0iNDAiCnZpZXdCb3g9IjAgMCA4MCA4MCI+CjxwYXRoIGZpbGw9IiNmNWMyNzYiIGQ9Ik0xNy40NDIsNDkuOTIxYy0yLjM5NS0wLjM4Ni0xMS44NS0yLjU4OC0xNS4zMDItMTQuODUyQzQuNzQ1LDM3LjYyNywxMC4wNjcsNDIsMTYsNDJoMC4wNTMJQzE2LjAyMSw0MS4zNTEsMTYsNDAuNjg4LDE2LDQwYy03LjM2MSwwLTE0LTgtMTQtOEgwYzAsMjEuNzU0LDE4LjY2NywyNi42NjcsMTguNjY3LDI2LjY2N2w2LjYzMywxLjg0MwlDMjIuMTc5LDU4LjQ0NSwxOS4xNTYsNTUuMTU1LDE3LjQ0Miw0OS45MjF6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2MyZThmZiIgZD0iTTc2LjQ3NSwzMy41Yy0wLjM2NS0zLjQ3OC00LjYwMS00LjM5MS05LjQ3LTUuNDQxQzYwLjIwNiwyNi41OTIsNTIuNSwyNC45MjksNTIuNSwxNiBjLTAuMDAxLTAuMDM4LTAuMDI4LTIuNzEyLDIuMDQ1LTQuODI2QzU2LjI4NSw5LjM5OSw1OC45OCw4LjUsNjIuNTU2LDguNWMyLjk5MywwLDUuMjk3LDAuODAxLDYuODQ2LDIuMzggYzIuMTI5LDIuMTY5LDIuMSw1LjA4MiwyLjA5OSw1LjExYzAsMC4wNC0wLjAwMSwyLjY5NC0xLjU4OCw0LjI5MWMtMC44MDQsMC44MDktMS44OTYsMS4yMTktMy4yNDUsMS4yMTkgYy0xLjM3OCwwLTIuNDM0LTAuNDA4LTMuMTM4LTEuMjE0Yy0xLjM3NS0xLjU3NS0xLjAzNy00LjE5MS0xLjAzNC00LjIxOGwwLjA3NS0wLjU1bC0wLjY4NC0wLjAyYy0yLjEyLDAtNC4zODcsMC42NTctNC4zODcsMi41MDEgYzAsNC4zMTMsNC41OTksNS43OTIsOS40NjgsNy4zNThjNS4wMSwxLjYxMiwxMC4xODYsMy4yNzcsMTAuNTE2LDguMTQySDc2LjQ3NXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjOGJiN2YwIiBkPSJNNjIuNTU2LDljMi44NDIsMCw1LjAyLDAuNzQ0LDYuNDcyLDIuMjEyQzcxLjAwNywxMy4yMTQsNzEsMTUuOTU4LDcxLDE2LjAwOSBjMCwwLjAyNC0wLjAxNywyLjQ4MS0xLjQzOSwzLjkxNUM2OC44NDQsMjAuNjQ4LDY3Ljg5OCwyMSw2Ni42NjcsMjFjLTEuMjQzLDAtMi4xNDUtMC4zNC0yLjc1OC0xLjA0IGMtMS4yMjQtMS4zOTgtMC45MjEtMy44MDEtMC45MTgtMy44MjNsMC4xNTEtMS4xMDJMNjIuMDMsMTVsLTAuMTQzLTAuMDAyQzU4Ljg3MiwxNC45OTksNTcsMTYuMTQ5LDU3LDE4IGMwLDQuNjc3LDQuOTg5LDYuMjgyLDkuODE1LDcuODM1QzcxLjY3OCwyNy40LDc2LjI5MSwyOC44ODMsNzYuOTI2LDMzaC0wLjAyMmMtMC43LTMuNDY5LTUuMTI4LTQuNDI0LTkuNzk0LTUuNDMxIEM2MC40OTYsMjYuMTQyLDUzLDI0LjUyNSw1MywxNS45OGMwLTAuMDI1LTAuMDE0LTIuNTEzLDEuOTE0LTQuNDY4QzU2LjU1Nyw5Ljg0NSw1OS4xMjgsOSw2Mi41NTYsOSBNNjIuNTU2LDggQzUxLjgwNSw4LDUyLDE2LDUyLDE2YzAsMTYuMDU2LDI0LDkuNjY3LDI0LDE4aDJjMC0xMC42MTEtMjAtNy42MTEtMjAtMTZjMC0xLjkwNSwzLjIzNS0yLjAwMSwzLjg4Ny0yLjAwMSBDNjEuOTYsMTUuOTk5LDYyLDE2LDYyLDE2cy0wLjgzMyw2LDQuNjY3LDZDNzIuMDU2LDIyLDcyLDE2LDcyLDE2UzcyLjE1LDgsNjIuNTU2LDhMNjIuNTU2LDh6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZWVhMyIgZD0iTTM0LDMxLjVjLTEuOTMsMC0zLjUtMS41Ny0zLjUtMy41czEuNTctMy41LDMuNS0zLjVzMy41LDEuNTcsMy41LDMuNVMzNS45MywzMS41LDM0LDMxLjV6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2Y1YzI3NiIgZD0iTTM0LDI1YzEuNjU0LDAsMywxLjM0NiwzLDNzLTEuMzQ2LDMtMywzcy0zLTEuMzQ2LTMtM1MzMi4zNDYsMjUsMzQsMjUgTTM0LDI0IGMtMi4yMDksMC00LDEuNzkxLTQsNHMxLjc5MSw0LDQsNHM0LTEuNzkxLDQtNFMzNi4yMDksMjQsMzQsMjRMMzQsMjR6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZWVhMyIgZD0iTTIwLjI2OCw0Mi4xNjdDMjEuOTM3LDM5Ljc2MywyNy41MjEsMzIuNSwzNCwzMi41YzYuNDg0LDAsMTIuMDY0LDcuMjYzLDEzLjczMyw5LjY2N0gyMC4yNjh6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2Y1YzI3NiIgZD0iTTM0LDMzYzUuNjUzLDAsMTAuNjU0LDUuODIzLDEyLjc1OSw4LjY2N0gyMS4yNDFDMjMuMzQ2LDM4LjgyMywyOC4zNDcsMzMsMzQsMzMgTTM0LDMyIGMtOC4xLDAtMTQuNjY3LDEwLjY2Ny0xNC42NjcsMTAuNjY3aDI5LjMzM0M0OC42NjcsNDIuNjY3LDQyLjEsMzIsMzQsMzJMMzQsMzJ6Ij48L3BhdGg+PGc+PHBhdGggZmlsbD0iI2ZmZWVhMyIgZD0iTTIyLjYxNSw3MS41YzAuNjA3LTEuMzksMy41NjEtMy4xOTUsNy42MDMtMy45NTVsMC4zMTYtMC4wNmwwLjA3Ni0wLjMxMyBDMzAuOTk0LDY1LjU5OSwzMi4zODgsNjQuNSwzNCw2NC41czMuMDA2LDEuMDk5LDMuMzksMi42NzJsMC4wNzYsMC4zMTNsMC4zMTYsMC4wNmM0LjA0MiwwLjc2LDYuOTk1LDIuNTY1LDcuNjAzLDMuOTU1SDIyLjYxNXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZjVjMjc2IiBkPSJNMzQsNjVjMS4zODEsMCwyLjU3NSwwLjk0MiwyLjkwNCwyLjI5bDAuMTUzLDAuNjI3bDAuNjM0LDAuMTE5IGMzLjM5NSwwLjYzOCw1LjY4MiwxLjk0OSw2LjcwMywyLjk2NEgyMy42MDdjMS4wMjEtMS4wMTUsMy4zMDgtMi4zMjYsNi43MDMtMi45NjRsMC42MzQtMC4xMTlsMC4xNTMtMC42MjcgQzMxLjQyNSw2NS45NDIsMzIuNjE5LDY1LDM0LDY1IE0zNCw2NGMtMS44ODEsMC0zLjQ0OSwxLjMwNC0zLjg3NSwzLjA1NEMyNS40MSw2Ny45MzksMjIsNzAuMjQ2LDIyLDcyaDI0IGMwLTEuNzU0LTMuNDEtNC4wNjEtOC4xMjUtNC45NDZDMzcuNDQ5LDY1LjMwNCwzNS44ODEsNjQsMzQsNjRMMzQsNjR6Ij48L3BhdGg+PC9nPjxnPjxwYXRoIGZpbGw9IiNmZmVlYTMiIGQ9Ik0zMy45OTgsNjMuNWMtMC44Ni0wLjAwNy0xOS4yMjgtMC40NDMtMTkuNDk1LTIzSDQ2YzAuODM4LTAuMDE5LDIwLjE2OS0wLjUwNiwyNi4xOTctNmg2Ljg1MyBDNTkuMzk0LDYyLjc3LDM0LjQzLDYzLjQ5MiwzMy45OTgsNjMuNXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZjVjMjc2IiBkPSJNNzguMDg3LDM1QzU4LjYxMSw2Mi4zNjMsMzQuMjM3LDYyLjk5NywzNC4wMDcsNjNjLTAuNzY1LTAuMDA3LTE4LjQ2Ni0wLjQwOC0xOC45OTUtMjJsMzEuMDEsMCBjMC44MjgtMC4wMTgsMjAuMDM1LTAuNTAzLDI2LjM2NS02SDc4LjA4NyBNODAsMzRoLThjLTUuNzc4LDUuNTU2LTI2LDYtMjYsNkgxNGMwLDIzLjg4OSwyMCwyNCwyMCwyNFM1OS43OTksNjMuNzI0LDgwLDM0TDgwLDM0eiI+PC9wYXRoPjwvZz48Zz48cGF0aCBmaWxsPSIjZmZlZWEzIiBkPSJNMzMuOTk4LDYzLjVjLTAuODYtMC4wMDctMTkuMjI4LTAuNDQzLTE5LjQ5NS0yM0g0NmMwLjgzOC0wLjAxOSwyMC4xNjktMC41MDYsMjYuMTk3LTZoNi44NTMgQzU5LjM5NCw2Mi43NywzNC40Myw2My40OTIsMzMuOTk4LDYzLjV6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2Y1YzI3NiIgZD0iTTc4LjA4NywzNUM1OC42MTEsNjIuMzYzLDM0LjIzNyw2Mi45OTcsMzQuMDA3LDYzYy0wLjc2NS0wLjAwNy0xOC40NjYtMC40MDgtMTguOTk1LTIybDMxLjAxLDAgYzAuODI4LTAuMDE4LDIwLjAzNS0wLjUwMywyNi4zNjUtNkg3OC4wODcgTTgwLDM0aC04Yy01Ljc3OCw1LjU1Ni0yNiw2LTI2LDZIMTRjMCwyMy44ODksMjAsMjQsMjAsMjRTNTkuNzk5LDYzLjcyNCw4MCwzNEw4MCwzNHoiPjwvcGF0aD48L2c+Cjwvc3ZnPg=="/>   Net-Working</h1>
        <div>
        <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"
           className={
            navigation.state === 'loading' ? 'loading' : ''
           }
      >
        <Outlet />
      </div>
    </>
  );
}
