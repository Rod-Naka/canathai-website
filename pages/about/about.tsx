import Image from 'next/image'

const AboutImage1 = () => (
  <Image
    src="/images/Cannathai_about.jpg" // Route of the image file
    height={680} // Desired size with correct aspect ratio
    width={468} // Desired size with correct aspect ratio
    alt="Canathai About 1"
  />
)


const About = () => {
    return (

      <div>
        <h2 className="font-normal text-2xl leading-6 text-gray-800 ml-10 mt-16">About CannaThai420</h2>

        <div className="h-full flex flex-nowrap">

          <br/><br/><br/><br/><br/><br/>
          {/* <div className="w-1/2 ml-10 mt-10">
            CannaThai420 NFTs, designed and developed by CannaThai420, represent artworks that our partner artists create to broadly mirror the growth process, 
            cycle, and ecosystem of Bespoke’s cannabis cultivation, from the first step all the way to the clinics and wellness centers around Thailand. 

            Each CannaThai420 NFT holders can register as a member of Triple C in our Discord Channel. Members of Triple C enjoy exclusive benefits including, 
            but not limited to, special privileges in Bespoke’s cannabis clinics and wellness centers across Thailand. Bespoke is the Cannabis arm of 
            Boutique Corporation PCL (“Boutique”), a company listed on the Stock Exchange of Thailand (MAI) with the company stock ticker being "BC”.
          </div> */}

          <div className="bg-lime-600 w-2/3 h-96 m-8 static rounded-lg ">
              <div className="bg-white w-1/2 h-96 m-2 hover:m-0 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in ">
                  <h1 className="m-4 text-2xl font-bold">What is About CannaThai420?</h1>
                  {/* <hr className="m-4 rounded-2xl border-t-2"> */}
                  <p className="m-4 text-lg">
                    CannaThai420 NFTs, designed and developed by CannaThai420, represent artworks that our partner artists create to broadly mirror the growth process, 
                    cycle, and ecosystem of Bespoke’s cannabis cultivation, from the first step all the way to the clinics and wellness centers around Thailand. 

                    Each CannaThai420 NFT holders can register as a member of Triple C in our Discord Channel. Members of Triple C enjoy exclusive benefits including, 
                    but not limited to, special privileges in Bespoke’s cannabis clinics and wellness centers across Thailand. Bespoke is the Cannabis arm of 
                    Boutique Corporation PCL (“Boutique”), a company listed on the Stock Exchange of Thailand (MAI) with the company stock ticker being "BC”.
                    </p>
              </div>
          </div>

          <div className="w-1/2 ml-52">
                  <AboutImage1 />
          </div>
        </div>
      </div>
    )
}

export default About;