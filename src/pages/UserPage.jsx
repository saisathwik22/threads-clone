import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={231}
        postImg='/post1.png'
        postTitle='Let us talk about threads.'
      />
      <UserPost
        likes={324}
        replies={21}
        postImg='/post2.png'
        postTitle='Do Learn new Techstack.'
      />
      <UserPost
        likes={1344}
        replies={12}
        postImg='/post3.png'
        postTitle='The Elon Musk.'
      />
      <UserPost likes={1231} replies={241} postTitle='first thread!.' />
    </>
  );
}

export default UserPage;
