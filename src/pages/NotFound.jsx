import { Header } from "../component/Header"
import './NotFound.css'

export function NotFound({ cart }) {
  return (
    <>
      <title>Not found</title>
      <Header cart={cart} />
      <div className="not-found">Page Not Found</div>
    </>
  )
}