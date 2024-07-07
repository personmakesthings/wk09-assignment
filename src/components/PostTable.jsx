// IMPORT MODULES
import Link from "next/link"

// COMPONENT
export default function PostTable({grabbedPosts}) {
    if (grabbedPosts.length === 0) {
        return (
        <p>No Convos currently available.</p>
        )
    }

    return (
        <div>
            
            <div className="table-thread-headings">
                <h4>Subject</h4>
                <h4 className="hide-on-small">Posted by</h4>
            </div>


            <div>
                {grabbedPosts.map((post) => {

                    // Abbreviates preview of post content
                    let abbrvContent = (post.content).length > 50 ? (post.content).substring(0, 50) + "..." : post.content

                    return (
                        <div className="table-card">
                            <Link href={`/post/${post.id}`}>
                                <div>
                                    <div className="table-card-info">
                                    <h3>{post.title}</h3>
                                    <p className="faded-text">{abbrvContent}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={`/users/${post.user_id}`} className="hide-on-small">
                                <div className="table-card-user">
                                    <p>{post.username}</p>
                                    <div className="table-card-user-img-container">
                                        <img className="table-card-user-img" src={post.avatar} alt={`Avatar of user ${post.username}`} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                    })
                }
            </div>

        </div>
    )
}