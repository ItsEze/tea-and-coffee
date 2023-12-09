// import logo from "../../src/assets/logo_2b.png"
import coffeeHyena from "../assets/hyenaBurrista.jpg"
import hyenaWorker from "../assets/hyenaWorker.jpg"
import hyenaMascot from "../assets/hyenaMascot.jpg"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Documentation from "./Documentation"
import logo from '../assets/final-logo-final.png'

const Divider = () => {
    return <div style={{ borderBottom: '1px solid #ccc', margin: '20px 0' }} />;
  };

export default function About() {
    return (
    <>
    <div>
    
    <div className="add-a-coffee-left">
    <div className="profile-logo"> 
    <img src={logo} alt="Company logo" className="about-image" />
    </div>
        <h4>Welcome to the Echo Coffee Co.!</h4>
        <ul>
        <li>Discover new coffees&#58; 
              On the Echo Coffee Co. site&#44; you can browse our database of a couple dozen &#40;and growing&#33;&#41; excellent coffees. Search for a recipe, or learn about a coffee type.
            </li>
            <li>Add your own coffees&#58; 
              Can't find what you&apos;re looking for&#63; Add it to our collection. You can also add your favorite coffee recipes to the collection for others to enjoy. 
            </li>
            <li>Write a review&#58; 
              Write a review about a coffee or recipe. You can also like other recipes.
            </li>
            <li>Meet new people&#58; 
              If you think our baboons are beautiful &#40;some people are into that kind of thing&#41;&#44; wait till you meet our customers&#33; On our site, you can get to know other coffee lovers and share recipes.
            </li>
        </ul>
        </div>


    <div className="company-about">
    <Divider/>
    <h1>About Us</h1>
    <h3>Echo Tea & Coffee: A Tale of Coffee, Tea, and Wilderness</h3>
    <Divider/>
    <p>Welcome to Echo Tea & Coffee, where the wild side of brewing comes alive! Founded in 2023, our journey began in the lush wilderness, guided by four passionate safari guides with a shared love for coffee, tea, and wildlife conservation.</p>
    </div>
    <br/>
    <br/>
    <div className="main-content">
    <Divider/>
    <h2 className="sectionTitle">Our Beginnings</h2>
    <h2 className="sectionContentTitle">In the African Savannas</h2>
    <Divider/>
      <h3 className="sectionContentSubTitle">Training the intrepid spotted hyena</h3>
      <p className="sectionContent"> Our story is as unique as our brews. Amidst the African savannas, we started an unconventional experiment&mdash;training orphaned spotted hyenas to brew coffee and tea. Equipped with specialized machines tailored for their paws, these intelligent creatures amazed everyone with their brewing skills. Our first shop opened in Bermuda, bringing a piece of the wild to every cup. </p>
    <Divider/>
    </div>
    <br/>
    <div className="main-content-image-container">
    <div className="main-content-image">
      <img src={coffeeHyena}  alt="Spotted hyena working the coffee machine" className="about-image"/>
    </div>
     <div className="main-content-image">
        <img src={hyenaMascot}  alt="glorious hyena mascot" className="about-image"/>
     </div>
    <div className="main-content-image">
      <img src={hyenaWorker}  alt="Spotted hyena delivering coffee" className="about-image"/>
    </div>
   
    </div>
    <br/>
    <div className="main-content">
    <Divider/>
    <p>However, our journey wasn't without its challenges. The hyenas, while skilled brewers, had a natural inclination that led to some... unexpected customer interactions. Facing the possibility of closing, fate intervened in the most extraordinary way.
      </p>
    </div>
    <br/>
    <br/>
    <div className="main-content">
    <Divider/>
    <h2 className="sectionContentTitle">The Fateful Storm</h2>
    <Divider/>
    <h3 className="sectionContentSubTitle">The Baboon Revolution</h3>
    <p className="sectionContent">We thought all was lost, but as fate would have it, a storm brought us a group of orphaned baboons, washed up on the beach in a 40-foot container during a storm! With these fury fellows, a new chapter began. Embracing our role as caretakers, we trained these remarkable baboons in the art of brewing and delivery. Their dexterity and friendly nature transformed our business, leading us to relocate to the United States, where we continue our unique blend of coffee, tea, and wildlife care.</p>
    <Divider/>
    </div>
    <br/>
    <br/>
    
     {/* <button className="coffee-control-button"><AutoAwesomeOutlinedIcon /> Suggest a feature</button> */}
     </div>
   <Documentation/>
    
    </>)
}