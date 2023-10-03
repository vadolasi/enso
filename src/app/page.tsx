import Image from "next/image"
import edu from "./images/edu.svg"
import wave from "./images/wave.svg"
import learning from "./images/learning.svg"
import steps from "./images/steps.svg"
import Navbar from "./components/Navbar"
import Link from "next/link"

const Page = () => {
  return (
    <>
      <Navbar />
      <main className="bg-base-200">
        <section className="hero min-h-[120vh] md:min-h-[90vh] relative" id="inicio">
          <div className="hero-content flex-col lg:flex-row-reverse gap-4 mt-10 md:mt-0">
            <Image src={edu} className="md:max-w-sm lg:max-w-lg" alt="" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Sua nova jornada de aprendizado começa aqui!</h1>
              <p className="py-6">Bem-vindo à nossa plataforma inovadora de banco de questões para preparação para o Revalida. Experimente a revolução na aprendizagem e alcance seu sucesso conosco!</p>
              <Link href="/register" className="btn btn-primary max-lg:btn-block">Comece agora</Link>
            </div>
          </div>
          <Image src={wave} className="absolute bottom-0 w-full" alt="" />
        </section>
        <section className="hero min-h-[50vh] bg-primary text-white">
          <div className="hero-content flex-col lg:flex-row-reverse gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Moldado para você!</h1>
              <p className="py-6">Nosso sistema inteligente se adapta ao seu nível de conhecimento, fornecendo questões sob medida que desafiam e elevam suas habilidades continuamente.</p>
            </div>
            <Image src={learning} className="md:max-w-sm lg:max-w-lg mr-12" alt="" />
          </div>
        </section>
        <section className="hero h-screen relative">
          <Image src={wave} className="absolute top-0 w-full transform rotate-180 -m-1" alt="" />
          <div className="hero-content flex-col lg:flex-row-reverse gap-4">
            <Image src={steps} className="md:max-w-sm lg:max-w-lg" alt="" />
            <div>
              <h1 className="text-5xl font-bold">Entenda da base ao ápice da complexidade!</h1>
              <p className="py-6">Nossa plataforma oferece uma rica variedade de questões, desde as mais simples até casos clínicos complexos, tudo adaptado ao seu nível de conhecimento. Você avançará gradualmente nos conteúdos, construindo uma base sólida para dominar os desafios do Revalida. Transforme sua preparação com a diversidade e a progressão que apenas nós oferecemos.</p>
            </div>
          </div>
        </section>
        <section className="h-screen" id="funcionalidades">

        </section>
      </main>
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
          <p className="font-bold">
            Enso <br/>Plataforma de questões
          </p>
          <p>Copyright © 2023 - Todos os direitos reservados</p>
        </aside>
      </footer>
    </>
  )
}

export default Page
