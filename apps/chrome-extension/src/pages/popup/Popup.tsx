import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
} from 'ui';
import { GithubIcon } from 'lucide-react';

export default function Popup() {
  return (
    <main className="h-96 w-96 form-control items-center justify-center">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-6">
            <Avatar className="w-14 h-14">
              <AvatarImage src="/icon128.png" className="rounded-full" />
            </Avatar>
          </div>
          <CardTitle>Project-S</CardTitle>
          <CardDescription>Project-S's chrome extension </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">In development</p>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Fractal-Tess/project-s/tree/main/apps/chrome-extension"
            className={buttonVariants({ variant: 'outline' })}
          >
            <GithubIcon />
            Track development
          </a>
        </CardContent>
      </Card>
    </main>
  );
}
