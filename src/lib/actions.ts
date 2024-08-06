"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "./client";

// export const switchFollow = async (userId: string) => {
//   const { userId: currentUserId } = auth();

//   if (!currentUserId) {
//     throw new Error("User is not authenticated!");
//   }

//   try {
//     const existingFollow = await prisma.follower.findFirst({
//       where: {
//         followerId: currentUserId,
//         followingId: userId,
//       },
//     });

//     if (existingFollow) {
//       await prisma.follower.delete({
//         where: {
//           id: existingFollow.id,
//         },
//       });
//     } else {
//       const existingFollowRequest = await prisma.followRequest.findFirst({
//         where: {
//           senderId: currentUserId,
//           receiverId: userId,
//         },
//       });

//       if (existingFollowRequest) {
//         await prisma.followRequest.delete({
//           where: {
//             id: existingFollowRequest.id,
//           },
//         });
//       } else {
//         await prisma.followRequest.create({
//           data: {
//             senderId: currentUserId,
//             receiverId: userId,
//           },
//         });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Something went wrong!");
//   }
// };

// export const switchBlock = async (userId: string) => {
//   const { userId: currentUserId } = auth();

//   if (!currentUserId) {
//     throw new Error("User is not Authenticated!!");
//   }

//   try {
//     const existingBlock = await prisma.block.findFirst({
//       where: {
//         blockerId: currentUserId,
//         blockedId: userId,
//       },
//     });

//     if (existingBlock) {
//       await prisma.block.delete({
//         where: {
//           id: existingBlock.id,
//         },
//       });
//     } else {
//       await prisma.block.create({
//         data: {
//           blockerId: currentUserId,
//           blockedId: userId,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Something went wrong!");
//   }
// };

// export const acceptFollowRequest = async (userId: string) => {
//   const { userId: currentUserId } = auth();

//   if (!currentUserId) {
//     throw new Error("User is not Authenticated!!");
//   }

//   try {
//     const existingFollowRequest = await prisma.followRequest.findFirst({
//       where: {
//         senderId: userId,
//         receiverId: currentUserId,
//       },
//     });

//     if (existingFollowRequest) {
//       await prisma.followRequest.delete({
//         where: {
//           id: existingFollowRequest.id,
//         },
//       });

//       await prisma.follower.create({
//         data: {
//           followerId: userId,
//           followingId: currentUserId,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Something went wrong!");
//   }
// };

// export const declineFollowRequest = async (userId: string) => {
//   const { userId: currentUserId } = auth();

//   if (!currentUserId) {
//     throw new Error("User is not Authenticated!!");
//   }

//   try {
//     const existingFollowRequest = await prisma.followRequest.findFirst({
//       where: {
//         senderId: userId,
//         receiverId: currentUserId,
//       },
//     });

//     if (existingFollowRequest) {
//       await prisma.followRequest.delete({
//         where: {
//           id: existingFollowRequest.id,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Something went wrong!");
//   }
// };

// export const updateProfile = async (
// formData: FormData, cover: string
// ) => {
//   // const { formData, cover } = payload;
//   const fields = Object.fromEntries(formData);

//   const filteredFields = Object.fromEntries(
//     Object.entries(fields).filter(([_, value]) => value !== "")
//   );

//   confirm here that the passwords match 

//   Uncomment and adjust the validation as necessary
//   const Profile = z.object({
//     cover: z.string().optional(),
//     name: z.string().max(60).optional(),
//     surname: z.string().max(60).optional(),
//     description: z.string().max(255).optional(),
//     city: z.string().max(60).optional(),
//     school: z.string().max(60).optional(),
//     work: z.string().max(60).optional(),
//     website: z.string().max(60).optional(),
//   });

//   const validatedFields = Profile.safeParse({ cover, ...filteredFields });

//   if (!validatedFields.success) {
//     console.log(validatedFields.error.flatten().fieldErrors);
//     return { success: false, error: true };
//   }

//   if (filteredFields) {
//     console.log("user data", filteredFields);
//     return { success: false, error: true };
//   }

//   Uncomment and adjust authentication as necessary
//   const { userId } = auth();

//   if (!userId) {
//     return { success: false, error: true };
//   }

//   try {
//     // await prisma.user.update({
//     //   where: {
//     //     id: userId,
//     //   },
//     //   data: validatedFields.data,
//     // });
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const switchLike = async (postId: number) => {
//   const { userId } = auth();

//   if (!userId) throw new Error("User is not authenticated!");

//   try {
//     const existingLike = await prisma.like.findFirst({
//       where: {
//         postId,
//         userId,
//       },
//     });

//     if (existingLike) {
//       await prisma.like.delete({
//         where: {
//           id: existingLike.id,
//         },
//       });
//     } else {
//       await prisma.like.create({
//         data: {
//           postId,
//           userId,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Something went wrong");
//   }
// };

// export const updateProfile = async(formData: FormData, cover: string, profile: string) => {
//   console.log(cover, profile)
//   const fields = Object.fromEntries(formData);
  
//   const filteredFields = Object.fromEntries(
//     Object.entries(fields).filter(([_, value]) => value !== "")
//   );

//   const Profile = z.object({
//     cover_image: z.string().optional(),
//     profile_image: z.string().optional(),
//     first_name: z.string().max(60).optional(),
//     last_name: z.string().max(60).optional(),
//     description: z.string().max(255).optional(),
//     organization: z.string().max(60).optional(),
//     title: z.string().max(60).optional(),
//     phone: z.string().max(60).optional(),
//     personal_email: z.string().max(60).optional(),
//     work_email: z.string().max(60).optional(),
//     graduation_year: z.string().max(60).optional(),
//     password: z.string().max(60).optional(),
//   });

//   const validatedFields = Profile.safeParse({ cover_image: cover,profile_image: profile, ...filteredFields });

//     if (!validatedFields.success) {
//     console.log(validatedFields.error.flatten().fieldErrors);
//     return "error";
//   }

//   const { userId } = auth();

//   if (!userId) {
//     return "error";
//   }

//   try {
//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: validatedFields.data,
//     });
//     // return "{ success: true, error: false }";
//   } catch (err) {
//     console.log(err);
//     // return "{ success: false, error: true }";
//   }
// }

type User = {
  id: string;
  username: string;
  profile_image: string | null;
  first_name: string | null;
  last_name: string | null;
  organization: string | null;
  title: string | null;
  phone: string | null; 
  description: string | null;
  password: string | null;
  personal_email: string | null;
  graduation_year: string | null;
  work_email: string | null;
  createdAt: Date;
};

type Comment = {
  id: number;
  desc: string;
  userId: string;
  postId: number;
  user: User;
};

type Post = {
  id: number;
  desc: string;
  img: string | null;
  video: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  channelId: number;
  user: User;
  comments: Comment[];
};

type Channel = {
  id: number;
  channel_name: string;
  channel_image: string | null;
  channel_description: string | null;
  users: {
    user: User;
  }[];
  posts: Post[];
};

export const fetchUserById = async (userId: string):  Promise<User | null>=> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (err) {
    console.error('Failed to fetch user:', err);
    return null;
  }
};

export const fetchPosts = async (channelId: number): Promise<Post[]> => {
  try {
    const posts = await prisma.post.findMany({
      where: { channelId },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        channel: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
            posts: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Optional: order posts by creation date
      },
    });

    return posts as Post[];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

export const fetchUserPosts = async (channelId: number, userId: string): Promise<Post[]> => {
  try {
    const posts = await prisma.post.findMany({
      where: { channelId, userId },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        channel: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
            posts: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Optional: order posts by creation date
      },
    });

    return posts as Post[];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};


export const addPost = async (formData: FormData, img: string | null, channelId: number) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const newPost = await prisma.post.create({      
      data: {
        desc: validatedDesc.data,
        img: img || null,
        video: null,
        userId: userId,
        channelId: channelId
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
            post: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      }
    });

    revalidatePath(`/dashboard/channels/currentChannel/${channelId}/${userId}`);
    return newPost;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId: number, channelId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath(`/dashboard/channels/posts_detail${channelId}/${userId}`)
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addComment = async (desc: string, postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};