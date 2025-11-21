export default function Form({ handleSubmit, inputRef }) {
    return(
        <form onSubmit = {handleSubmit}>
            <input
            ref = {inputRef}
            required = {true}
            />
            <button>Submit</button>
        </form>
    )
};