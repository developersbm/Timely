import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  Group,
  GroupMember,
  Calendar,
  Event,
  Template,
  SavingPlan,
  Notification,
} from "./interface";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
    responseHandler: async (response) => {
      const contentType = response.headers.get("content-type");
    
      if (contentType?.includes("application/json")) {
        return await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(`Unexpected response: ${errorText}`);
      }
    }
  }),  
  reducerPath: "api",
  tagTypes: [
    "Memberships",
    "Users",
    "Groups",
    "Calendars",
    "Events",
    "Notifications",
    "Templates",
    "SavingPlans",
    "GroupMembers",
  ],
  endpoints: (build) => ({
    // Memberships update (Free or Premium)

    // Users
    getAuthUser: build.query({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        const user = await getCurrentUser();
        const session = await fetchAuthSession();
        if (!session) throw new Error("No session found");
        const { userSub } = session;

        const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
        const userDetails = userDetailsResponse.data as User;

        return { data: { user, userSub, userDetails } };
      },
    }),
    getUser: build.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),    
    getUsers: build.query<User[], void>({
      query: () => "user",
      providesTags: ["Users"],
    }),
    createUser: build.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Groups
    getGroups: build.query<Group[], void>({
      query: () => "group",
      providesTags: ["Groups"],
    }),
    createGroup: build.mutation<Group, { title: string; description: string; userId: number }>({
      query: ({ title, description, userId }) => ({
        url: "/group",
        method: "POST",
        body: {
          title,
          description,
          userId: Number(userId),
        },
      }),
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: build.mutation<void, number>({
      query: (groupId) => ({
        url: `group/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),
    
    // Add & Remove Members
    addMember: build.mutation<void, { groupId: number; email: string }>({
      query: ({ groupId, email }) => ({
        url: `groupMember/add-member`,
        method: "POST",
        body: { groupId, email },
      }),
      invalidatesTags: ["GroupMembers"],
    }),
    removeMember: build.mutation<void, { groupId: number; memberId: number }>({
      query: ({ groupId, memberId }) => ({
        url: `groupMember/${groupId}/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupMembers"],
    }),

    // Get all group members
    getGroupMembers : build.query<GroupMember[], void>({
      query: () => "groupMember",
      providesTags: ["GroupMembers"]
    }),

    // Get all Members in the group
    getMembersByGroup: build.query<
    { userId: number; name: string; email: string; events: any[] }[],
    number
  >({
    query: (groupId) => ({
      url: `groupMember/${groupId}/members`,
      method: "GET",
    }),
    providesTags: ["GroupMembers"],
  }),
  

    // Calendars (Calendar is creates as soon as user registers)
    getCalendars: build.query<Calendar[], void>({
      query: () => "calendars",
      providesTags: ["Calendars"],
    }),
    createCalendar: build.mutation<Calendar, Partial<Calendar>>({
      query: (calendar) => ({
        url: "calendars",
        method: "POST",
        body: calendar,
      }),
      invalidatesTags: ["Calendars"],
    }),

    // Events (CRUD)
    getEventCalendar: build.query<Event[], number>({
      query: (calendarId) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/calendar?calendarId=${calendarId}`,
      providesTags: ["Events"],
    }),       
    createEvent: build.mutation<Event, Partial<Event>>({
      query: (event) => ({
        url: "event",
        method: "POST",
        body: event,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: build.mutation<void, number>({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: build.mutation<Event, Partial<Event>>({
      query: ({ id, ...updatedEvent }) => ({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`,
        method: "PUT",
        body: updatedEvent,
      }),
      invalidatesTags: ["Events"],
    }),
    

    // Notifications
    getNotifications: build.query<Notification[], void>({
      query: () => "notifications",
      providesTags: ["Notifications"],
    }),
    createNotification: build.mutation<Notification, Partial<Notification>>({
      query: (notification) => ({
        url: "notifications",
        method: "POST",
        body: notification,
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Templates (CRUD)
    getTemplates: build.query<Template[], void>({
      query: () => "template",
      providesTags: ["Templates"],
    }),
    createTemplate: build.mutation<Template, Partial<Template>>({
      query: (template) => ({
        url: "templates",
        method: "POST",
        body: template,
      }),
      invalidatesTags: ["Templates"],
    }),

    // Saving Plans (CRUD)
    getSavingPlans: build.query<SavingPlan[], void>({
      query: () => "saving-plans",
      providesTags: ["SavingPlans"],
    }),
    createSavingPlan: build.mutation<SavingPlan, Partial<SavingPlan>>({
      query: (savingPlan) => ({
        url: "saving-plans",
        method: "POST",
        body: savingPlan,
      }),
      invalidatesTags: ["SavingPlans"],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,

  useGetGroupsQuery,
  useCreateGroupMutation,
  useGetGroupMembersQuery,
  useDeleteGroupMutation,

  useGetMembersByGroupQuery,

  useAddMemberMutation,
  useRemoveMemberMutation,

  useGetCalendarsQuery,
  useCreateCalendarMutation,

  useGetEventCalendarQuery,
  useDeleteEventMutation,
  useCreateEventMutation,
  useUpdateEventMutation,

  useGetNotificationsQuery,
  useCreateNotificationMutation,

  useGetTemplatesQuery,
  useCreateTemplateMutation,

  useGetSavingPlansQuery,
  useCreateSavingPlanMutation,
} = api;
