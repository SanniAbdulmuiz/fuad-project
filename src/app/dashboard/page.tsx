"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Wallet, ChevronDown, Search, Filter } from "lucide-react";
import Wallet2 from "@/assets/Wallet.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { session } from "@/lib/session";
import ChartIcon from "@/assets/Chart.svg";
import { DataTable } from "@/components/dashboard/data-table";

const summaryCards = [
  {
    title: "Wallet Balance",
    value: "₦10,869,000.96",
    icon: Wallet2,
    weekly: true,
  },
  { title: "Account Details", icon: Wallet2 },
  { title: "Wallet Report", icon: Wallet2 },
  { title: "Total debit", value: "₦0.00", icon: ChartIcon, weekly: true },
];

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const token = session.getToken();

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getAllUsers(token!),
    enabled: !!token && isClient,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: trainersData, isLoading: isLoadingTrainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => api.getAllTrainers(token!),
    enabled: !!token && isClient,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: gymsData, isLoading: isLoadingGyms } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => api.getAllGyms(token!),
    enabled: !!token && isClient,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isLoading =
    !isClient || isLoadingUsers || isLoadingTrainers || isLoadingGyms;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-[16px] font-medium mb-7 leading-[100%] text-[#45464E]">
          Payment Summary
        </h2>
        <div className="flex flex-wrap gap-4">
          <div
            className="bg-primary text-[#FFFFFF] px-[15px] py-2 rounded-[12px]"
            style={{ width: "150px" }}
          >
            <p className="text-[14px] font-normal leading-[100%]">Gyms</p>
            <h3 className="text-[20px] leading-[100%] font-medium pt-[4px]">
              {isLoading ? "..." : gymsData?.total ?? 0}
            </h3>
          </div>
          <div
            className="bg-primary text-[#FFFFFF] px-[15px] py-2 rounded-[12px]"
            style={{ width: "150px" }}
          >
            <p className="text-[14px] leading-[100%] font-normal">Trainers</p>
            <h3 className="text-[20px] leading-[100%] font-medium pt-[4px]">
              {isLoading ? "..." : trainersData?.total ?? 0}
            </h3>
          </div>
          <div
            className="bg-primary text-[#FFFFFF] px-[15px] py-2 rounded-[12px]"
            style={{ width: "150px" }}
          >
            <p className="text-[14px] leading-[100%] font-normal">Users</p>
            <h3 className="text-[20px] leading-[100%] font-medium pt-[4px]">
              {isLoading ? "..." : usersData?.data.length ?? 0}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {summaryCards.map((card, i) => (
            <Card key={i} className="p-[15px]">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-0">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  {card.icon === Wallet ? (
                    <card.icon className="w-5 h-5" />
                  ) : (
                    <Image
                      src={card.icon}
                      alt="Chart Icon"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                {card.weekly && (
                  <Button variant="ghost" size="sm" className="text-[#8B8D97]">
                    This Week <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <div className="text-sm text-[#8B8D97]">{card.title}</div>
                {card.value && (
                  <div className="text-2xl font-bold">{card.value}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card>
          <CardContent className="p-6">
            <DataTable />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
