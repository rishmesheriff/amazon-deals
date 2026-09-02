import { chatGPTSignInPath, getChatGPTUser } from './chatgpt-auth';
import { DealsExperience } from '@/components/deals-experience';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getChatGPTUser();

  return (
    <DealsExperience
      user={user ? { name: user.displayName, email: user.email } : null}
      signInPath={chatGPTSignInPath('/')}
    />
  );
}

