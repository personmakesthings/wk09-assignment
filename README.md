# wk09-assignment

This is for the following assignment: Week 9 - Build a social network.


Deployed on Render:
- https://wk09-assignment.onrender.com/


Other links for README.md:
- [Copy of SQL code](./README/SQL-code.sql)



# Reflection
In our previous projects, I remember feeling pretty uncomfortable about exposing database actions like deleting and updating records for anyone to use if they visit the site. So this week, in comes user authentication to fix that problem. I had a lot of fun getting UI elements & pages to conditionally render or be available depending on the user's ID or privilege role (e.g. admin/moderator).
- The Clerk docs I used for this: https://clerk.com/docs/guides/basic-rbac


I also tried a different sidebar-style navigation layout for this website using CSS grid, riffing off of the UI for Twitter. It gave me a chance to see how UI elements that don't neatly match the names of said elements are used with semantic HTML. For example, it seems a lot of websites set navigation sidebars as `<header>` elements, which seems reasonable.



### Features
- The site has a responsive display.

- Users can create an account and log in with Clerk. The Clerk login form has been embedded into the website itself.

- Users can make posts, comments, update their profile, and all content made by a user is associated with their user ID.

- User/post does not exist error: attempting to go to the page of a user/post that does not exist (e.g. `/users/foobar`, `/post/-1`) serves an error page.

- Radix UI Primitive: Popover (https://www.radix-ui.com/primitives/docs/components/popover).
    - Implemented as the user's icon in the sidebar (shows when logged in). When clicked, shows a pop up display that has buttons for various actions the user can take: viewing their profile, new post, log out.
    - Shows the user's display picture. Conditionally shows a placeholder avatar if the user's profile isn't set up. Buttons redirect to set up profile if the user's profile isn't set up.

- You can click on the user's profile from any content they have made, such as from the timeline of posts, such as the front page (although this hides on smaller viewports due to size constraints) and from any posts or comments they make.

- Users who haven't set up their profile (they do not have a database entry for their account) cannot make posts or comments. If they attempt to make a post, the post page will redirect them to the profile set-up page. If they view a post, the comments form will not show; instead, the user will see a message & link directing them to finish setting up their profile. They will also be redirected to the profile set up page upon log in.

- Certain pages cannot be accessed by viewers of the website who are not logged in, specifically any pages related to editing content.

- Users can edit and delete their posts, comments & user bio. This function is restricted to the user's own content, unless a user has a privileged role - admin, moderator - which can perform edit & delete tasks on all content.

- Delete actions cascade in the database, e.g. deleting a post also deletes comments on that post.




### Issues & missing features
All of these issues are due to a lack of time to fix or implement:

- There are media queries on the site that I think make the user interface appropriate for desktop & tablet-sized viewports, but I haven't implemented anything that would be mobile-appropriate. I specifically wanted to get the sidebar to hide from view unless clicked for very small viewports.

- There is no "following" page and follow users function, despite the database having tables to record this and a link for the "following" page in the sidebar. Consider the link as example of a custom 404 error page for now.

- I still haven't implemented a fix for the previous page's scroll position being carried over to the next page.

- Website metadata for title and description isn't set up for subpages.

- No custom favicon.

- Website design is very basic/generic-looking.

- Users can't change their email address or password.

- Comments on user pages don't link back to the post the comment was made on.

- The "Leave a comment" form doesn't clear after a user submits a comment.

- I started running into issues with `revalidatePath()` not always working. This is noticeable when the user is redirected after performing database actions, such as deleting a post. Refreshing the page manually shows the updated page.

- Database user table needs a user role column so roles can be displayed on user profiles.




### Things I'd like to improve on
- I'd like to implement a proper way to handle uploading images, such as avatars, instead of just having someone use an off-site image URL. This could be in the form of uploading from the user's device and also checking that the file is an image (and rejecting a file that isn't).



## Attributions:
- Sidebar icons: https://www.vecteezy.com/vector-art/8197137-frequently-used-essential-icons-collections-suitable-for-design-elements-of-user-interface-and-ux-essential-icon-set-in-outline-style-editable-eps10