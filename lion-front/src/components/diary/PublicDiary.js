
import Posts from "./Posts";
import WritePost from "./WritePost";



export default function PublicDiary({writePost, setWritePost}) {
    console.log(writePost);
    return (
        <>
            {writePost ? ( <Posts/> ) : (<WritePost writePost={writePost} setWritePost={setWritePost}/>)}
        </>
    );
}