"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "./client";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId: number, desc: string) => {
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

export const addPost = async (formData: FormData, img: string) => {
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
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};

export const addStory = async (img: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/")
  } catch (err) {
    console.log(err);
  }
};

// old functional one 
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
//     return "success"
//   } catch (err) {
//     console.log(err);
//     return "errror"
//   }
// }

export const updateProfile = async(formData: FormData, cover: string, profile: string) => {
  const fields = Object.fromEntries(formData);
  console.log("fields", fields)

  // Separate password fields from the rest of the fields
  const { password, confirm_password, ...restFields } = fields;
  console.log(password, confirm_password)

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover_image: z.string().optional(),
    profile_image: z.string().optional(),
    first_name: z.string().max(60).optional(),
    last_name: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    organization: z.string().max(60).optional(),
    title: z.string().max(60).optional(),
    phone: z.string().max(60).optional(),
    personal_email: z.string().max(60).optional(),
    work_email: z.string().max(60).optional(),
    graduation_year: z.string().max(60).optional(),
    password: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover_image: cover,profile_image: profile, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { status: 'error', message: 'Internal Server Error' };
  }

  // Validate password and confirm_password
  if (password || confirm_password) {
    const passwordSchema = z.object({
      password: z.string().min(6, "Password must be at least 6 characters long"),
      confirm_password: z.string(),
    }).refine(
      (data) => data.password === data.confirm_password,
      {
        message: "Passwords must match!",
        path: ["confirm_password"],
      }
    );

    const passwordResult = passwordSchema.safeParse({ password, confirm_password });

    if (!passwordResult.success) {
      console.log(passwordResult.error.flatten().fieldErrors);
      return { status: 'error', message: passwordResult.error.flatten().fieldErrors.confirm_password?.[0] || 'Invalid password input' };
    }
  }

  const { userId } = auth();

  if (!userId) {
    return { status: 'error', message: 'Internal Server Error' };
  }

  try {
    // Primsa update
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });

    if (password) {
      try {
        await clerkClient.users.updateUser(userId, {
          password: password as string, // Ensure it's cast to a string
        });
      } catch (error) {
        console.error("Failed to update password:", error);
        return { status: 'error', message: 'Password update failed. Please ensure it meets the required criteria.' };
      }
    }

    return { status: 'success', message: 'Profile updated successfully' };
  } catch (err) {
    console.log(err);
    return { status: 'error', message: 'Internal Server Error' };
  }
}