
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardAppointments from "@/components/dashboard/DashboardAppointments";
import RecentCalls from "@/components/dashboard/RecentCalls";
import TodoList from "@/components/dashboard/TodoList";
import PracticeInfo from "@/components/dashboard/PracticeInfo";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader />
      <StatsCards />
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Praktijkoverzicht</h2>
        
        <DashboardAppointments />
        <RecentCalls />
        <TodoList />
        <PracticeInfo />
      </section>
    </div>
  );
};

export default Dashboard;
