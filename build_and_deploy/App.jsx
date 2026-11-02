const a={
        backgroundColor: 'orange',
        color:"white",
        textAlign:"center",
        border:"2px solid red",
        margin: 0,
    }
    const b={
        backgroundColor: 'pink',
        color:"black",
        textAlign:"center",
        border:"2px solid red",
        margin: 0,
    }
export function Header() {
    return <div className="header" style={a}>
              <h1>this is the header</h1>
           </div>;
}
export function Main() {
    return <div className="main" style={b}>
              <h1>this is the main content</h1>
           </div>;
}
export function Footer() {
    return <div className="footer" style={a}>
              <h1>this is the footer</h1>
           </div>;
}
export default function App() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
        )
}