import { Icon } from '@iconify/react';
import '../css/style.css';

function Details() {
    return (
        <div>
            <div className="template-details intro-y news box">
                <h2 className="intro-y">
                    Template Name
                </h2>
                <div className="intro-y dark:text-slate-500"> Created Date
                    <span>•</span>
                    <a className="text-primary" href="">Contract Category</a>
                    <span>•</span> Template Type
                </div>
                <div className="intro-y">
                    <div className="news__preview">
                        <object width="100%" height="700" data="https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/files%2F170.pdf?alt=media&token=024fdf6c-e9e6-41bf-8915-9f215a585a66" type="application/pdf">   </object>
                    </div>
                </div>
                {/* <div class="intro-y flex relative pt-16 sm:pt-6 items-center pb-6">
                <a href="" class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full border border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500 mr-2 tooltip" title="Bookmark"> <i data-lucide="bookmark" class="w-3 h-3"></i> </a>
                <div class="intro-x flex mr-3">
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit">
                        <img alt="Midone - HTML Admin Template" class="rounded-full border border-white zoom-in tooltip" src="dist/images/profile-11.jpg" title="Brad Pitt" />
                    </div>
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit -ml-4">
                        <img alt="Midone - HTML Admin Template" class="rounded-full border border-white zoom-in tooltip" src="dist/images/profile-9.jpg" title="Kate Winslet" />
                    </div>
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit -ml-4">
                        <img alt="Midone - HTML Admin Template" class="rounded-full border border-white zoom-in tooltip" src="dist/images/profile-3.jpg" title="Matt Damon" />
                    </div>
                </div>
                <div class="absolute sm:relative -mt-12 sm:mt-0 w-full flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm">
                    <div class="intro-x mr-1 sm:mr-3"> Comments: <span class="font-medium">28</span> </div>
                    <div class="intro-x mr-1 sm:mr-3"> Views: <span class="font-medium">202k</span> </div>
                    <div class="intro-x sm:mr-3 ml-auto"> Likes: <span class="font-medium">94k</span> </div>
                </div>
                <a href="" class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300 ml-auto sm:ml-0 tooltip" title="Share"> <i data-lucide="share-2" class="w-3 h-3"></i> </a>
                <a href="" class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full bg-primary text-white ml-2 tooltip" title="Download PDF"> <i data-lucide="share" class="w-3 h-3"></i> </a>
            </div> */}
                <div className="intro-y">
                    <p>Description:</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className="intro-y dark:border-darkmode-400">
                    <div>
                        <div className="image-fit">
                            <img alt="Creator Avatar" src="https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-1/281349832_3114845732069443_2942167027652900504_n.jpg?stp=dst-jpg_p240x240&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=Q5DYFqvsNy8AX-kqQuZ&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfBumvgNjhKn8tL6G8Qw8vJ1DWqxwCIryOrLE4xQeUdUOg&oe=657BDC40" />
                        </div>
                        <div>
                            <span>Creator Name</span>, Author
                            <div>Creator Role</div>
                        </div>
                    </div>
                    {/* <div class="flex items-center text-slate-600 dark:text-slate-500 sm:ml-auto mt-5 sm:mt-0">
                    Share this post:
                    <a href="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in tooltip" title="Facebook"> <i class="w-3 h-3 fill-current" data-lucide="facebook"></i> </a>
                    <a href="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in tooltip" title="Twitter"> <i class="w-3 h-3 fill-current" data-lucide="twitter"></i> </a>
                    <a href="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in tooltip" title="Linked In"> <i class="w-3 h-3 fill-current" data-lucide="linkedin"></i> </a>
                </div> */}
                </div>
                {/* <div className="intro-y dark:border-darkmode-400">
                <div>2 Comments</div>
                <div className="news__input">
                    <Icon icon="lucide:message-circle" className='icon' />
                    <textarea className="form-control" rows="1" placeholder="Post a comment..."></textarea>
                </div>
            </div>
            <div className="intro-y">
                <div>
                    <div>
                        <div className="image-fit">
                            <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-11.jpg" />
                        </div>
                        <div class="ml-3 flex-1">
                            <div class="flex items-center"> <a href="" class="font-medium">Brad Pitt</a> <a href="" class="ml-auto text-xs text-slate-500">Reply</a> </div>
                            <div class="text-slate-500 text-xs sm:text-sm">53 seconds ago</div>
                            <div class="mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400">
                    <div class="flex">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit">
                            <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-9.jpg" />
                        </div>
                        <div class="ml-3 flex-1">
                            <div class="flex items-center"> <a href="" class="font-medium">Kate Winslet</a> <a href="" class="ml-auto text-xs text-slate-500">Reply</a> </div>
                            <div class="text-slate-500 text-xs sm:text-sm">45 seconds ago</div>
                            <div class="mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                        </div>
                    </div>
                </div> 
            </div> */}
            </div>
        </div>
    )
}

export default Details;