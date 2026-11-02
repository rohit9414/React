function Header(props){
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
   return(
       <div>
           <h1 style={a}>Header Content</h1>
           <p style={b}>Name: {props.name}</p>
           <p style={{ margin: 0 }}>Age: {props.age}</p>
       </div>
    )
}

function Main(){
    return(
        <div>
            <h1 style={{ margin: 0 }}>Main Content</h1>
        </div>
    )
}
function Footer(){
    return(
      <div>
        <h1 style={{ margin: 0 }}>Footer Content</h1>
        <a href="https://github.com/coderarmy-notes/mern-stack-course/tree/main/04React" target="_blank" rel="noopener noreferrer" style={{ margin: 0 }}>Code link D2</a>
        <br />
        <a href="https://app.notion.com/p/Lecture-02-JSX-Babel-props-and-React-Component-2b13a78e0e22804797a1ef605cb2d3fb" target="_blank" rel="noopener noreferrer" style={{ margin: 0 }}>Class Notes</a>
      </div>
    )
}
function App(){
    return(
        <>
            <Header name="Rohit Kumar Goswami" age={23} />
            <Main />
            <Footer />
        </>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);