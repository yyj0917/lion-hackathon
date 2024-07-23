
import Posts from "./Posts";
import WritePost from "./WritePost";



export default function PublicDiary({writePost}) {

    return (
        <>
            {writePost ? ( <Posts/> ) : (<WritePost/>)}
        </>
    );
}