import Posts from "./Posts";

const Feed = () => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
        </div>
    )
}

export default Feed;