import ProductDrawer from "./components/drawer";

export default function ProductLayout({ children }) {
    return (
        <section>
            <ProductDrawer data={children} />
        </section>
    )
}