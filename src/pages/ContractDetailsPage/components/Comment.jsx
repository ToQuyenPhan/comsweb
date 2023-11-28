import { Margin } from "@syncfusion/ej2-react-documenteditor";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";

function Comment() {
  const [commentData, setCommentData] = useState([]);
  const token = localStorage.getItem("Token");
  // const contractId = location.state.contractId;
  const contractId = "1";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://localhost:7073/Comments/contract?contractId=${contractId}`,
          {
            mode: "cors",
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          }
        );
        const data = await response.json();
        const comments = data.items;
        // console.log(data.items);
        // const comments = data; // assuming the data is an array of comments
    
        // Fetch user details for each comment
        const commentsWithData = await Promise.all(
          comments.map(async (comment) => {
            const res = await fetch(
              `https://localhost:7073/Users/id?id=${comment.userId}`,
              {
                mode: "cors",
                method: "GET",
                headers: new Headers({
                  Authorization: `Bearer ${token}`,
                }),
              }
            );
            const userData = await res.json();
    
            return {
              ...comment,
              user: {
                username: userData.username,
                image: userData.image,
              },
            };
          })
        );
        // console.log(commentsWithData);
        setCommentData(commentsWithData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {commentData ? (
        <div>
          <h2 class="text-lg font-medium truncate mr-5">Comments</h2>

          <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"></div>

          {commentData &&
            commentData.map((item) => (
              <div key={item.id}>
                {/* {console.log(item)} */}
                <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit rounded-full overflow-hidden">
                    <img alt="" src={item.user.image} />
                  </div>
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">{item.fullName}</div>
                    <div class="text-gray-600 text-xs mt-0.5">{formatDistanceToNow(new Date(item.createdAt))} ago</div>
                    <div class="text-gray-600 text-xs mt-0.5">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading Comments...</p>
      )}
    </div>
  );
}

export default Comment;
