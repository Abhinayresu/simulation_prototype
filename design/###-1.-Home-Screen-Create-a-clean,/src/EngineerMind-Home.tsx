import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleQuestionMark,
  FolderKanban,
  House,
  LayoutTemplate,
  Play,
  Sparkles,
} from "lucide-react";
import {
  Badge,
  Button,
  ButtonEndIcon,
  ButtonIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSecondaryContent,
  ItemTitle,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./EngineerMind-Home.screen.css";

export default function EngineerMindHome() {
  const navigate = useNavigate();
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-background text-foreground flex w-full min-h-screen">
          <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex px-4 py-6 flex-col shrink-0 w-62">
            <div className="flex px-2 items-center gap-3">
              <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-9">
                <Sparkles className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-base tracking-tight">
                  EngineerMind AI
                </span>
                <span className="text-muted-foreground text-xs">
                  Think · Simulate · Validate
                </span>
              </div>
            </div>
            <nav
              aria-label="Primary navigation"
              className="flex mt-10 flex-col gap-2"
            >
              <a
                href="#"
                aria-current="page"
                className="font-medium rounded-lg bg-primary text-primary-foreground text-sm flex p-3 items-center gap-3"
              >
                <House className="size-5" />
                <span>Home</span>
              </a>
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <FolderKanban className="size-5" />
                <span>Projects</span>
              </a>
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <LayoutTemplate className="size-5" />
                <span>Templates</span>
              </a>
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <BookOpen className="size-5" />
                <span>Knowledge base</span>
              </a>
            </nav>
            <div className="flex mt-auto flex-col gap-5">
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <CircleQuestionMark className="size-5" />
                <span>Help</span>
              </a>
              <div className="border-x-border border-t border-t-border border-b-border flex px-2 pt-5 items-center gap-3">
                <div className="font-semibold rounded-full bg-muted text-foreground text-sm flex justify-center items-center size-9">
                  EC
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-ellipsis whitespace-nowrap text-foreground text-sm overflow-hidden">
                    Evan Carter
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Engineer
                  </span>
                </div>
                <ChevronDown className="text-muted-foreground ml-auto shrink-0 size-4" />
              </div>
            </div>
          </aside>
          <section className="flex flex-col flex-1 min-w-0">
            <header className="bg-background border-t-border border-r-border border-b border-b-border border-l-border flex px-8 justify-between items-center h-16">
              <div className="text-sm flex items-center gap-2">
                <span className="text-muted-foreground">Workspace</span>
                <ChevronRight className="text-muted-foreground size-4" />
                <span className="font-medium text-foreground">Home</span>
              </div>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="rounded-lg text-muted-foreground p-2 hover:bg-accent hover:text-foreground"
                >
                  <Bell className="size-5" />
                </button>
                <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-9">
                  EC
                </div>
              </div>
            </header>
            <main className="p-8 flex-1">
              <div className="flex mx-auto flex-col gap-8 max-w-6xl">
                <Card className="shadow-sm border-0 relative pt-0 h-104 overflow-hidden">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1789184721693-e8bd062b0ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYWlycGxhbmUlMjBmbHlpbmclMjBhYm92ZSUyMGNsb3VkcyUyMHZpZXdlZCUyMGZyb20lMjBwYXNzZW5nZXIlMjB3aW5kb3d8ZW58MXwwfHx8MTc5NTExMzI5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                    }
                    alt="Airplane wing above the clouds"
                    data-photoid="_UrzQr9zsVE"
                    data-authorname="Medad Media"
                    data-authorurl="https://unsplash.com/@medadmedia"
                    data-blurhash={"LfEzD_Dh8^t8IvnhxtRkNKs-n$a}"}
                    className="absolute inset-0 size-full object-cover object-right"
                  />
                  <div className="bg-linear-to-t from-black/60 via-black/20 to-transparent absolute inset-y-0 left-0 w-3/5" />
                  <CardContent className="text-white flex relative z-10 p-8 flex-col justify-end gap-4 h-full max-w-xl">
                    <span className="font-semibold text-white/80 text-xs tracking-[0.2em]">
                      AERODYNAMICS WORKSPACE
                    </span>
                    <h1 className="font-semibold text-4xl tracking-tight">
                      Welcome back, Abhinay
                    </h1>
                    <p className="text-white/80 text-lg max-w-lg">
                      Let’s analyse your next engineering problem with
                      confidence.
                    </p>
                    <Button
                      size="lg"
                      className="w-fit"
                      onClick={() => navigate("/problem-definition")}
                    >
                      <ButtonIcon icon={Play} className="size-4" />
                      Start New Simulation
                      <ButtonEndIcon icon={ArrowRight} className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
                <div className="grid relative gap-6 grid-cols-4">
                  <div className="bg-border absolute inset-x-0 top-4 h-px" />
                  <div className="text-center flex relative flex-col items-center gap-3">
                    <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                      1
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      Problem definition
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-3">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      2
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Simulation planning
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-3">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      3
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Execution
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-3">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      4
                    </div>
                    <span className="text-muted-foreground text-sm">{`Results & validation`}</span>
                  </div>
                </div>
                <div className="grid gap-6 grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ItemGroup>
                        <Item size="sm">
                          <ItemContent>
                            <ItemTitle>Wing performance study</ItemTitle>
                            <ItemDescription>Today, 10:42 AM</ItemDescription>
                          </ItemContent>
                          <ItemSecondaryContent>
                            <Badge>Ready</Badge>
                            <ChevronRight className="text-muted-foreground size-4" />
                          </ItemSecondaryContent>
                        </Item>
                        <Item size="sm">
                          <ItemContent>
                            <ItemTitle>HVAC diffuser optimisation</ItemTitle>
                            <ItemDescription>Yesterday</ItemDescription>
                          </ItemContent>
                          <ItemSecondaryContent>
                            <Badge variant="secondary">Completed</Badge>
                            <ChevronRight className="text-muted-foreground size-4" />
                          </ItemSecondaryContent>
                        </Item>
                        <Item size="sm">
                          <ItemContent>
                            <ItemTitle>
                              Aircraft nacelle drag analysis
                            </ItemTitle>
                            <ItemDescription>12 Jun 2024</ItemDescription>
                          </ItemContent>
                          <ItemSecondaryContent>
                            <Badge variant="outline">Draft</Badge>
                            <ChevronRight className="text-muted-foreground size-4" />
                          </ItemSecondaryContent>
                        </Item>
                      </ItemGroup>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick start</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      <p className="text-muted-foreground text-sm leading-6 max-w-md">
                        Use guided CFD workflows to move from an engineering
                        question to validated simulation results with a clear,
                        repeatable process.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm">
                          Import template
                        </Button>
                        <Button variant="secondary" size="sm">
                          Open knowledge base
                        </Button>
                        <Button variant="outline" size="sm">
                          View all projects
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
