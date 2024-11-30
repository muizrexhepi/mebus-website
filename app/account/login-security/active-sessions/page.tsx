"use client";
import { account } from "@/appwrite.config";
import React, { useEffect, useState } from "react";

const ActiveSessions = () => {
  // const [sessions, setSessions] = useState([]);

  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const response = await account.listSessions();
  //       setSessions(response);
  //     } catch (error) {
  //       console.error("Error fetching sessions:", error);
  //     }
  //   };

  //   fetchSessions();
  // }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Active Sessions</h1>
      {/* <div className="space-y-4">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session.$id}
              className={`p-4 border rounded ${
                session.current ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p>
                <strong>Device:</strong> {session.deviceName}{" "}
                {session.deviceModel ? `(${session.deviceModel})` : ""}
              </p>
              <p>
                <strong>Browser:</strong> {session.clientName}{" "}
                {session.clientVersion}
              </p>
              <p>
                <strong>OS:</strong> {session.osName} {session.osVersion}
              </p>
              <p>
                <strong>IP Address:</strong> {session.ip}
              </p>
              <p>
                <strong>Location:</strong> {session.countryName} (
                {session.countryCode})
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(session.$createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Expires At:</strong>{" "}
                {new Date(session.expire).toLocaleString()}
              </p>
              <p>
                <strong>Factors:</strong> {session.factors.join(", ")}
              </p>
              {session.current && (
                <p className="text-green-600 font-semibold">
                  This is your current session.
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No active sessions found.</p>
        )}
      </div> */}
    </div>
  );
};

export default ActiveSessions;
