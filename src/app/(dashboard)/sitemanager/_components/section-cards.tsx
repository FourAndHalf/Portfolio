"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, CardProgressbar, CardContent } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Workforce Deployment</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">1,350</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              90%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            1350 of 1500 allocated <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">+5% vs yesterday</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Equipment / Machinary Usage</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">28</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +2.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            18 Equipments taken | 10 Machinary used <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Returned 7 equipments</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Downtime</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">
            25
            <span className="text-xl font-semibold tabular-nums @[250px]/card:text-xl"> mins</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              -12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Electricity Outage
          </div>
          <div className="text-muted-foreground">Needs personal assistance</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Safety Compliance Rating</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">98</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            69 of 72 issues resolved <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Compliant with checklist</div>
        </CardFooter>
      </Card>
    </div>
  );
}