import { Margin } from "@syncfusion/ej2-react-documenteditor";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

//test with contractId = 5
function Comment({ contractId = 5 }) {
  const [comment, setComment] = useState(null);

  const token = localStorage.getItem("Token");
  useEffect(() => {
    const fetchComment = async () => {
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
        setComment(data);
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    };

    fetchComment();
  }, [contractId]);

  return (
    <div>
      {comment ? (
        <div>
          <h2 class="text-lg font-medium truncate mr-5">Comments</h2>

          {comment.items &&
            comment.items.map((item) => (
              <div key={item.id}>
                <hr />
                <hr />
                <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                  {/* <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
            <img alt="" src="" />
        </div> */}
                </div>
                <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                  <div className="flex items-center">
                    <div className="font-medium">{item.id}</div>
                    <div className="text-xs text-slate-500 ml-auto">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-slate-500 mt-1">{item.content}</div>
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
