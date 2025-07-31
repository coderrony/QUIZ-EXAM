// "use client";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";




// import { ReactNode } from "react";

// import BackButton from "./BackButton";

// import Social from "@/app/auth/_components/Social";
// import Header from "./Header";

// type CardWrapperType={
//    children:ReactNode,
//    headerLabel:string,
//    backButtonLabel:string,
//    backButtonHref:string,
//    showSocial:boolean
// }

// export const CardWrapper = ({
//   children,
//   headerLabel,
//   backButtonLabel,
//   backButtonHref,
//   showSocial,
// }:CardWrapperType) => {
//   return (
//     <Card className="w-[400px] shadow-md">
//       <CardHeader>
//         <Header label={headerLabel} />
//       </CardHeader>
//       <CardContent>{children}</CardContent>
//       {showSocial && (
//         <CardFooter>
//           <Social />
//         </CardFooter>
//       )}
//       <CardFooter>
//         <BackButton label={backButtonLabel} href={backButtonHref} />
//       </CardFooter>
//     </Card>
//   );
// };
