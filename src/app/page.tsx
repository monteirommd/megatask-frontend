import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Exportação de função assincrona
// export default async function RootPage() {
//   //variavel que guarda os cookies da requisição pelo await que para a execução do codigo
//   const cookieStore = await cookies();
//   //variavel para guardar o cookie TOKEN que foi buscado dentro do objeto de cookie
//   const token =  cookieStore.get('token')
//   //verifica o valor de cookie, se ele existir retorna true e leva o usuario para o dashboard
//   if (token) {
//     redirect('/dashboard');
//   //caso não exista retorna undefined ou false e leva o usuario para o login
//   } else {
//     redirect('/login');
//   }
// }

export default function RootPage(){
  redirect('/auth-check')
}
