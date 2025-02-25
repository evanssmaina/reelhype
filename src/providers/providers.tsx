import NextUIProviderWrapper from './nextui-provider';
import NuqsAdapterProvider from './nuqs-adapter-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapterProvider>
      <NextUIProviderWrapper>{children}</NextUIProviderWrapper>
    </NuqsAdapterProvider>
  );
}
