"use client";

import { useGetAuthUserQuery, useGetUserQuery, useGetUsersQuery, useGetGroupsQuery, useGetGroupMembersQuery, useAddMemberMutation } from "@/state/api";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import GroupModal from "@/components/GroupModal/page";

const GroupsPage = () => {
  const { data: users } = useGetUsersQuery();
  const { data: groups } = useGetGroupsQuery();
  const { data: groupMembers } = useGetGroupMembersQuery();
  
  const { data: authData } = useGetAuthUserQuery({});
  const userId = authData?.user.userId;
  
  const { data: user } = useGetUserQuery(userId ?? "", {
    skip: !userId,
  });

  const userGroups =
    groupMembers
      ?.filter((gm) => gm.userId === user?.id && gm.status === "Active")
      .map((gm) => groups?.find((g) => g.id === Number(gm.groupId))) || [];

  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMemberGroup, setAddMemberGroup] = useState<number | null>(null); 
  const [email, setEmail] = useState("");

  const [addMember] = useAddMemberMutation();

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleAddMember = (groupId: number) => {
    setAddMemberGroup((prev) => (prev === groupId ? null : groupId));
    setEmail("");
  };

  const handleAddMember = async (groupId: number) => {
    if (!email.trim()) return alert("Please enter an email.");
    try {
      await addMember({ groupId, email }).unwrap();
      alert("Member added successfully!");
      setAddMemberGroup(null);
      setEmail("");
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member.");
    }
  };

  return (
    <div className="container mx-auto p-6 dark:bg-black dark:text-white">
      {/* Title & Button aligned horizontally */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Groups</h1>

        {/* Create Group Button (aligned right) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          + Create Group
        </button>
      </div>

      {/* Group List */}
      {userGroups.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You are not part of any groups.</p>
      ) : (
        userGroups.map((group) => {
          if (!group) return null;

          return (
            <div key={group.id} className="border rounded-lg p-4 mb-4 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  aria-label={`Toggle members for ${group.title}`}
                >
                  {expandedGroups[group.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                  )}
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>

              {expandedGroups[group.id] && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Members:</h3>
                  <ul className="list-disc ml-6">
                    {groupMembers
                      ?.filter((gm) => gm.groupId === group.id)
                      .map((gm) => {
                        const member = users?.find((user) => user.id === gm.userId);
                        return (
                          <li
                            key={member?.id}
                            className="flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100"
                          >
                            <Image
                              src={"/profile.png"}
                              alt={""}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <span>
                              {member?.name} {member?.id === user?.id ? "(You)" : ""}
                            </span>
                          </li>
                        );
                      })}
                  </ul>

                  {/* Show "Add Member" button only when group is expanded */}
                  <button
                    onClick={() => toggleAddMember(group.id)}
                    className={`mt-4 px-4 py-2 rounded-md transition ${
                      addMemberGroup === group.id ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {addMemberGroup === group.id ? "Cancel" : "+ Add Member"}
                  </button>

                  {/* Show input only when Add Member is clicked */}
                  {addMemberGroup === group.id && (
                    <div className="mt-2">
                      <input
                        type="email"
                        placeholder="Enter user email"
                        className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        onClick={() => handleAddMember(group.id)}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full"
                      >
                        Add Member
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}

      <GroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => {}} />
    </div>
  );
};

export default GroupsPage;
