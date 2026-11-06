import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

// Describes the information every course has
type Course = {
  title: string;
  fee: string;
  image: number;
  learn: string;
  idealFor: string;
};

const imgCanine = require('./assets/petTraining (2).jpg');
const imgGrooming = require('./assets/petGrooming (3).jpg');
const imgBusiness = require('./assets/PetManagement (2).jpg');
const imgPuppy = require('./assets/puppyCare (2).jpg');
const imgBehaviour = require('./assets/PetBehaviour (3).jpg'); // CHANGE ME: dalmatian picture
const imgFirstAid = require('./assets/petFirstAid (2).jpg'); // CHANGE ME: dog in nurse hat picture
const imgWalking = require('./assets/dogWalking (3).jpg'); // CHANGE ME: two dogs on leads picture
const imgHome = require('./assets/MEATBALL.png'); // CHANGE ME: Meatball and Gus picture
const imgLogo = require('./assets/pawLogoCircle.png'); // CHANGE ME: logo picture

const canine: Course = {
  title: 'Canine Obedience Training',
  fee: 'R1500',
  image: imgCanine,
  learn:
    '• Basic dog commands (sit, stay, come, heel)\n• Leash training techniques\n• Positive reinforcement methods\n• Correcting unwanted behaviours\n• Dog socialisation and confidence building',
  idealFor: 'Pet owners, dog trainers, pet sitters, and aspiring canine behaviour specialists.',
};

const grooming: Course = {
  title: 'Pet Grooming',
  fee: 'R1500',
  image: imgGrooming,
  learn:
    '• Bathing and drying techniques\n• Coat brushing and maintenance\n• Nail trimming\n• Ear and eye cleaning\n• Safe use of grooming equipment',
  idealFor: 'Pet owners, aspiring groomers, and people wanting to start a pet grooming business.',
};

const behaviour: Course = {
  title: 'Animal Behaviour',
  fee: 'R1500',
  image: imgBehaviour,
  learn:
    '• Understanding animal psychology\n• Reading body language\n• Behaviour modification techniques\n• Stress management in pets\n• Mental stimulation and enrichment activities',
  idealFor: 'Pet owners, trainers, veterinary assistants, and animal professionals.',
};

const business: Course = {
  title: 'Pet Business Management',
  fee: 'R1500',
  image: imgBusiness,
  learn:
    '• Starting a pet-related business\n• Customer service skills\n• Marketing your services\n• Financial planning and budgeting\n• Managing daily business operations',
  idealFor:
    'Aspiring entrepreneurs who want to open pet grooming salons, training centres, pet sitting businesses, or pet supply stores.',
};

const puppy: Course = {
  title: 'Puppy Care',
  fee: 'R750',
  image: imgPuppy,
  learn:
    '• Feeding and nutrition\n• Puppy health and hygiene\n• Toilet training\n• Basic obedience\n• Socialisation with people and other pets',
  idealFor: 'New puppy owners and families.',
};

const firstAid: Course = {
  title: 'Pet First Aid',
  fee: 'R750',
  image: imgFirstAid,
  learn:
    '• Responding to common pet emergencies\n• Treating minor cuts and wounds\n• Recognising signs of illness\n• CPR basics for pets\n• When to seek veterinary care',
  idealFor: 'Pet owners, pet sitters, kennel staff, and veterinary assistants.',
};

const walking: Course = {
  title: 'Basic Dog Walking',
  fee: 'R750',
  image: imgWalking,
  learn:
    '• Safe dog handling\n• Proper leash control\n• Understanding dog behaviour during walks\n• Exercise routines for different breeds\n• Pet safety in public spaces',
  idealFor: 'Dog owners, pet sitters, and anyone interested in offering professional dog walking services.',
};

//CHECKING WHAT THE PERSON TYPES 
// Keeps only numbers
function digitsOnly(text: string) {
  return text.replace(/[^0-9]/g, '');
}

// Keeps only letters, spaces, hyphens and apostrophes (so names like Sadé works)
function lettersOnly(text: string) {
  return text.replace(/[^A-Za-z\u00C0-\u017F '\-]/g, '');
}

// Checks the email looks like name@something.com
function emailOk(text: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

export default function App() {
  // Which screen is showing, and whether the hamburger menu is open
  const [screen, setScreen] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Is the person logged in? (practice login - nothing is saved)
  const [loggedIn, setLoggedIn] = useState(false);

  // The course that was tapped
  const [selected, setSelected] = useState<Course>(canine);

  // Fee calculation tick boxes
  const [cObedience, setCObedience] = useState(false);
  const [cGrooming, setCGrooming] = useState(false);
  const [cPuppy, setCPuppy] = useState(false);
  const [cBehaviour, setCBehaviour] = useState(false);
  const [cBusiness, setCBusiness] = useState(false);
  const [cFirstAid, setCFirstAid] = useState(false);
  const [cWalking, setCWalking] = useState(false);

  // Contact
  const [fullName, setFullName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  // Purchase (practice only - nothing is really paid or saved)
  const [feeMsg, setFeeMsg] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [phone, setPhone] = useState('');
  const [payMsg, setPayMsg] = useState('');
  const [paidTotal, setPaidTotal] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [paidPhone, setPaidPhone] = useState('');
  function go(name: string) {
    setScreen(name);
    setMenuOpen(false);
  }
  function goBack() {
    if (screen === 'detail') {
      go('courses');
    } else if (screen === 'mission') {
      go('about');
    } else if (screen === 'payment') {
      go('fees');
    } else {
      go('home');
    }
  }


  function openCourse(c: Course) {
    setSelected(c);
    setScreen('detail');
  }

  // Purchase button on a course page: ticks only that course, then goes to payment
  function purchaseCourse() {
    setCObedience(selected.title === canine.title);
    setCGrooming(selected.title === grooming.title);
    setCPuppy(selected.title === puppy.title);
    setCBehaviour(selected.title === behaviour.title);
    setCBusiness(selected.title === business.title);
    setCFirstAid(selected.title === firstAid.title);
    setCWalking(selected.title === walking.title);
    setFeeMsg('');
    setPayMsg('');
    setScreen('payment');
  }

  function sendMessage() {
    if (fullName.trim().length < 2) {
      setContactMsg('Please enter your full name');
    } else if (!emailOk(contactEmail)) {
      setContactMsg('Please enter a valid email address');
    } else if (message.trim().length < 5) {
      setContactMsg('Please type a longer message');
    } else {
      setContactMsg('Message sent. Thank you!');
      setFullName('');
      setContactEmail('');
      setMessage('');
    }
  }

  // Purchase button on the fee page
  function goToPurchase() {
    if (count === 0) {
      setFeeMsg('Please select at least one course');
    } else {
      setFeeMsg('');
      setPayMsg('');
      setScreen('payment');
    }
  }

  // Pay button on the payment page (practice only)
  function doPay() {
    if (count === 0) {
      setPayMsg('Please select a course first');
    } else if (accountName.trim().length < 2) {
      setPayMsg('Please enter the account holder name (letters only)');
    } else if (accountNumber.length < 8 || accountNumber.length > 11) {
      setPayMsg('Bank account number must be 8 to 11 digits');
    } else if (branchCode.length !== 6) {
      setPayMsg('Branch code must be 6 digits');
    } else if (phone.length !== 10 || phone.charAt(0) !== '0') {
      setPayMsg('Cellphone number must be 10 digits and start with 0');
    } else {
      setPaidTotal(total);
      setPaidCount(count);
      setPaidPhone(phone);

      // Clear the form and the ticked courses
      setAccountName('');
      setAccountNumber('');
      setBranchCode('');
      setPhone('');
      setPayMsg('');
      setCObedience(false);
      setCGrooming(false);
      setCPuppy(false);
      setCBehaviour(false);
      setCBusiness(false);
      setCFirstAid(false);
      setCWalking(false);

      setScreen('success');
    }
  }

  // Fee calculation
  const count =
    (cObedience ? 1 : 0) +
    (cGrooming ? 1 : 0) +
    (cPuppy ? 1 : 0) +
    (cBehaviour ? 1 : 0) +
    (cBusiness ? 1 : 0) +
    (cFirstAid ? 1 : 0) +
    (cWalking ? 1 : 0);

  const subtotal =
    (cObedience ? 1500 : 0) +
    (cGrooming ? 1500 : 0) +
    (cPuppy ? 750 : 0) +
    (cBehaviour ? 1500 : 0) +
    (cBusiness ? 1500 : 0) +
    (cFirstAid ? 750 : 0) +
    (cWalking ? 750 : 0);

  let discountRate = 0;
  if (count === 2) {
    discountRate = 0.05;
  } else if (count === 3) {
    discountRate = 0.1;
  } else if (count >= 4) {
    discountRate = 0.15;
  }

  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * 0.15;
  const total = afterDiscount + vat;

  // The page that shows in the middle of the screen
  let page = <View />;

  if (screen === 'home') {
    page = (
      <View style={styles.center}>
        <View style={styles.heroCard}>
          <Image source={imgHome} style={styles.homeImage} resizeMode="cover" />
        </View>
        <Text style={styles.welcome}>Welcome to Pawsitive Pet Academy!</Text>
        <Text style={styles.body}>
          We are a pet academy that offers courses which provides education on how to properly take care of pets.
        </Text>
        <Pressable style={styles.button} onPress={() => go('about')}>
          <Text style={styles.buttonText}>About Us</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => go('courses')}>
          <Text style={styles.buttonText}>Our Courses</Text>
        </Pressable>
      </View>
    );
  } else if (screen === 'about') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.body}>
          Caring, trustworthy and professional: these three words guide everything we do at Pawsitive Pet Academy,
          from how we design our courses to how we treat every learner and every animal that walks through our doors.
        </Text>
        <Text style={styles.subheading}>Our Story</Text>
        <Text style={styles.body}>
          Pawsitive Pet Academy was established in 2023 by Sarah Smith, a Durban based pet care educator. Sarah noticed
          that while thousands of people bring pets into their homes every year, very few ever receive real guidance on
          proper care, training, nutrition or emergency response. Too often, that gap in knowledge led to stressed
          pets, frustrated owners, and problems that could easily have been prevented with the right care.
        </Text>
        <Text style={styles.subheading}>Founder</Text>
        <Text style={styles.body}>
          Sarah Smith founded Pawsitive Pet Academy out of a genuine love for animals and a frustration with how little
          practical support most new pet owners receive. With a background in animal care and a passion for teaching,
          she designed every course herself, drawing on real questions and real challenges she's seen pet owners face
          again and again.
        </Text>
        <Pressable style={styles.button} onPress={() => go('mission')}>
          <Text style={styles.buttonText}>Our Mission, Vision and Goals</Text>
        </Pressable>
      </View>
    );
  } else if (screen === 'mission') {
    page = (
      <View style={styles.center}>
        <View style={styles.cloud}>
          <Text style={styles.subheading}>Our Mission</Text>
          <Text style={styles.body}>
            Our mission is to provide affordable, practical, and professional pet care training that equips
            individuals with the knowledge and skills to care for animals responsibly while creating opportunities
            for employment and entrepreneurship.
          </Text>
        </View>
        <View style={styles.cloud}>
          <Text style={styles.subheading}>Our Vision</Text>
          <Text style={styles.body}>
            Our goal is to become South Africa's leading pet care training academy by providing high-quality education
            that promotes responsible pet ownership and professional pet care services.
          </Text>
        </View>
        <View style={styles.cloud}>
          <Text style={styles.subheading}>Our Goals</Text>
          <Text style={styles.body}>
            • Provide practical pet care education for all experience levels{'\n'}• Promote responsible and
            compassionate pet ownership{'\n'}• Support aspiring entrepreneurs who want to start pet-related
            businesses{'\n'}• Improve the health and well-being of pets through quality education
          </Text>
        </View>
      </View>
    );
  } else if (screen === 'courses') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>Six-Month Professional Development Courses</Text>
        <View style={styles.row}>
          <Pressable style={styles.card} onPress={() => openCourse(canine)}>
            <Image source={canine.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{canine.title}</Text>
          </Pressable>
          <Pressable style={styles.card} onPress={() => openCourse(grooming)}>
            <Image source={grooming.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{grooming.title}</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.card} onPress={() => openCourse(behaviour)}>
            <Image source={behaviour.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{behaviour.title}</Text>
          </Pressable>
          <Pressable style={styles.card} onPress={() => openCourse(business)}>
            <Image source={business.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{business.title}</Text>
          </Pressable>
        </View>

        <Text style={styles.heading}>Six-Week Practical Skills Courses</Text>
        <View style={styles.row}>
          <Pressable style={styles.card} onPress={() => openCourse(puppy)}>
            <Image source={puppy.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{puppy.title}</Text>
          </Pressable>
          <Pressable style={styles.card} onPress={() => openCourse(firstAid)}>
            <Image source={firstAid.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{firstAid.title}</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.card} onPress={() => openCourse(walking)}>
            <Image source={walking.image} style={styles.cardImage} />
            <Text style={styles.cardLabel}>{walking.title}</Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (screen === 'detail') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>{selected.title}</Text>
        <Image source={selected.image} style={styles.detailImage} />
        <Text style={styles.fee}>Course Fee: {selected.fee}</Text>
        <Text style={styles.subheading}>What You'll Learn</Text>
        <Text style={styles.body}>{selected.learn}</Text>
        <Text style={styles.subheading}>Ideal For</Text>
        <Text style={styles.body}>{selected.idealFor}</Text>
        <Pressable style={styles.button} onPress={purchaseCourse}>
          <Text style={styles.buttonText}>Purchase this Course</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => go('courses')}>
          <Text style={styles.buttonText}>Back to Courses</Text>
        </Pressable>
      </View>
    );
  } else if (screen === 'fees') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>Total Fee Calculation</Text>

        <Pressable style={styles.feeRow} onPress={() => setCObedience(!cObedience)}>
          <Text style={styles.body}>{cObedience ? '☑' : '☐'} Canine Obedience</Text>
          <Text style={styles.body}>R1500</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCGrooming(!cGrooming)}>
          <Text style={styles.body}>{cGrooming ? '☑' : '☐'} Pet Grooming</Text>
          <Text style={styles.body}>R1500</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCPuppy(!cPuppy)}>
          <Text style={styles.body}>{cPuppy ? '☑' : '☐'} Puppy Care</Text>
          <Text style={styles.body}>R750</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCBehaviour(!cBehaviour)}>
          <Text style={styles.body}>{cBehaviour ? '☑' : '☐'} Animal Behaviour</Text>
          <Text style={styles.body}>R1500</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCBusiness(!cBusiness)}>
          <Text style={styles.body}>{cBusiness ? '☑' : '☐'} Pet Business Management</Text>
          <Text style={styles.body}>R1500</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCFirstAid(!cFirstAid)}>
          <Text style={styles.body}>{cFirstAid ? '☑' : '☐'} Pet First Aid</Text>
          <Text style={styles.body}>R750</Text>
        </Pressable>
        <Pressable style={styles.feeRow} onPress={() => setCWalking(!cWalking)}>
          <Text style={styles.body}>{cWalking ? '☑' : '☐'} Basic Dog Walking</Text>
          <Text style={styles.body}>R750</Text>
        </Pressable>

        <View style={styles.totals}>
          <Text style={styles.totalLine}>Subtotal: R{subtotal.toFixed(2)}</Text>
          <Text style={styles.totalLine}>Discount: R{discount.toFixed(2)}</Text>
          <Text style={styles.totalLine}>VAT (15%): R{vat.toFixed(2)}</Text>
          <Text style={styles.totalLine}>Total: R{total.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.button} onPress={goToPurchase}>
          <Text style={styles.buttonText}>Purchase</Text>
        </Pressable>
        <Text style={styles.body}>{feeMsg}</Text>

        <View style={styles.cloud}>
          <Text style={styles.subheading}>Number of Courses Enrolled / Discount</Text>
          <Text style={styles.body}>
            1 Course: No Discount (0%){'\n'}2 Courses: 5% Discount{'\n'}3 Courses: 10% Discount{'\n'}4 or More
            Courses: 15% Discount
          </Text>
        </View>
      </View>
    );
  } else if (screen === 'payment') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>Payment</Text>
        <Text style={styles.totalLine}>Amount to pay: R{total.toFixed(2)}</Text>
        <Text style={styles.body}>This is a practice payment. Do not enter your real banking details.</Text>

        <Text style={styles.label}>Account holder name:</Text>
        <TextInput
          style={styles.input}
          value={accountName}
          onChangeText={(t) => setAccountName(lettersOnly(t))}
          maxLength={40}
          placeholder="Name on the account"
        />
        <Text style={styles.label}>Bank account number:</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={(t) => setAccountNumber(digitsOnly(t))}
          maxLength={11}
          placeholder="Practice number only"
          keyboardType="numeric"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Branch code:</Text>
        <TextInput
          style={styles.input}
          value={branchCode}
          onChangeText={(t) => setBranchCode(digitsOnly(t))}
          maxLength={6}
          placeholder="Branch code"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Cellphone number (for your SMS):</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(t) => setPhone(digitsOnly(t))}
          maxLength={10}
          placeholder="Cellphone number"
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={doPay}>
          <Text style={styles.buttonText}>Pay R{total.toFixed(2)}</Text>
        </Pressable>
        <Text style={styles.body}>{payMsg}</Text>
      </View>
    );
  } else if (screen === 'success') {
    page = (
      <View style={styles.center}>
        <Text style={styles.heading}>Purchase Successful ✅</Text>
        <Text style={styles.body}>An SMS has been sent to {paidPhone}:</Text>
        <View style={styles.sms}>
          <Text style={styles.smsText}>
            Pawsitive Pet Academy: Your payment of R{paidTotal.toFixed(2)} was received. You are now enrolled in{' '}
            {paidCount} course(s). Thank you!
          </Text>
        </View>
        <Pressable style={styles.button} onPress={() => go('home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  } else if (screen === 'contact') {
    page = (
      <View style={styles.center}>
        <View style={styles.titleRow}>
          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.phoneIcon}>☎️</Text>
        </View>
        <Text style={styles.label}>Full name:</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={(t) => setFullName(lettersOnly(t))} maxLength={40} placeholder="Enter your full name" />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={contactEmail}
          onChangeText={setContactEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Message:</Text>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          maxLength={300}
          placeholder="Type your message"
          multiline={true}
        />
        <Pressable style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
        <Text style={styles.body}>{contactMsg}</Text>
        <Text style={styles.subheading}>Our Email:</Text>
        <Text style={styles.body}>info@pawsitive.co.za</Text>
        <Text style={styles.subheading}>Based in:</Text>
        <Text style={styles.body}>Durban, South Africa</Text>
        <View style={styles.mapBox}>
          <MapView
            style={{ width: '100%', height: 200, borderRadius: 12 }}
            initialRegion={{
              latitude: -29.8587,
              longitude: 31.0218,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude: -29.8587, longitude: 31.0218 }} title="Pawsitive Pet Academy" />
          </MapView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.app}>
      /* Top bar with logo and hamburger menu */
      <View style={styles.header}>
        <Pressable style={styles.imgLogo} onPress={() => go('home')}>
          <Image source={imgLogo} style={{ width: 50, height: 50 }} />
        </Pressable>
        <Pressable onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburger}>☰</Text>
        </Pressable>
      </View>

      /* Hamburger menu */
      {menuOpen ? (
        <View style={styles.menu}>
          <Pressable onPress={() => go('home')}>
            <Text style={styles.menuItem}>Home</Text>
          </Pressable>
          <Pressable onPress={() => go('about')}>
            <Text style={styles.menuItem}>About Us</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => go('courses')}>
            <Text style={styles.menuItem}>Courses</Text>
          </Pressable> 
          <Pressable onPress={() => go('mission')}>
            <Text style={styles.menuItem}>Mission, Vision and Goals</Text>
          </Pressable>
          <Pressable onPress={() => go('courses')}>
            <Text style={styles.menuItem}>Courses</Text>
          </Pressable>
          <Pressable onPress={() => go('fees')}>
            <Text style={styles.menuItem}>Total Fee Calculation</Text>
          </Pressable>
          <Pressable onPress={() => go('contact')}>
            <Text style={styles.menuItem}>Contact Us</Text>
          </Pressable>
      
        </View>
      ) : null}

      /* Back arrow, above the page (not on the home page) */
      {screen !== 'home' ? (
        <Pressable style={styles.backRow} onPress={goBack}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      ) : null}

      /* The page */
      <ScrollView style={styles.bodyScroll} contentContainerStyle={styles.scrollContent}>
        {page}
      </ScrollView>

      /* Bottom navigation bar */
      <View style={styles.nav}>
        <Pressable onPress={() => go('home')}>
          <Text style={styles.navIcon}>🏠</Text>
        </Pressable>
        <Pressable onPress={() => go('courses')}>
          <Text style={styles.navIcon}>📖</Text>
        </Pressable>
        <Pressable onPress={() => go('fees')}>
          <Text style={styles.navIcon}>🛒</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#D3E8EE' },
  header: {
    backgroundColor: '#8AA2A9',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgLogo: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#ADF6B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backRow: { paddingHorizontal: 16, paddingTop: 8 },
  backArrow: { fontSize: 32, color: '#717C89' },
  sms: { backgroundColor: 'white', borderRadius: 16, padding: 14, marginTop: 12, width: '100%' },
  smsText: { fontSize: 14, color: '#717C89' },
  hamburger: { fontSize: 30, color: '#717C89' },
  menu: { backgroundColor: '#A1E5AB', paddingVertical: 8 },
  menuItem: { fontSize: 16, color: '#717C89', paddingVertical: 8, paddingHorizontal: 20 },
  bodyScroll: { flex: 1 },
  scrollContent: { padding: 20 },
  center: { alignItems: 'center' },
  nav: {
    backgroundColor: '#8AA2A9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  navIcon: { fontSize: 28 },
  heroCard: {
    width: '100%',
    borderRadius: 24,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    lineHeight: 0,
  },
  homeImage: { width: '100%', height: 180, borderRadius: 16, marginBottom: 0 },
  welcome: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#717C89', marginBottom: 12 },
  heading: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 16, color: '#717C89' },
  subheading: { fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 12, color: '#717C89' },
  body: { fontSize: 13, color: '#717C89', marginTop: 6, alignSelf: 'flex-start' },
  label: { fontSize: 13, color: '#717C89', alignSelf: 'flex-start', marginTop: 12 },
  input: {
    width: '100%',
    backgroundColor: '#8AA2A9',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    color: 'white',
  },
  messageInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#8AA2A9',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    color: 'white',
    textAlignVertical: 'top',
  },
  button: { backgroundColor: '#90BAAD', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: '#717C89', marginTop: 16, textDecorationLine: 'underline' },
  cloud: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16, 
    marginTop: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 16 },
  card: { width: '45%', alignItems: 'center' },
  cardImage: { width: '100%', height: 100, borderRadius: 12 },
  cardLabel: { fontSize: 12, textAlign: 'center', marginTop: 6, color: '#717C89' },
  detailImage: { width: 260, height: 170, borderRadius: 16, marginBottom: 20 },
  fee: { fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', color: '#717C89' },
  feeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totals: { width: '100%', marginTop: 16 },
  totalLine: { fontSize: 15, fontWeight: 'bold', color: '#717C89', marginTop: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  phoneIcon: { fontSize: 28, marginLeft: 8 },
  mapBox: { width: '100%', marginTop: 16, borderRadius: 12, overflow: 'hidden' },
});
//Referencing !!!
//Expo(n.d) MapView (react-native-maos).Expo Documentation. Available at: https://docs.expo.dev/versions/latest/sdk/map-view/
//Emojipedia(n.d.)Emojipedia.Available at https://emojipedia.org
//MDN contributors (n.d.) Conditional (ternary) operator. MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
//MDN contributors (n.d.) Regular expressions. MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//MDN contributors (n.d.) Nummber.prototype.toFixed(). MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
//Meta Platforms (n.d.) Pressable. React Native. Available at: https://reactnative.dev/docs/pressable
//Meta Platforms (n.d.) Everyday types. TypeScripts Handbook. Available at: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
//Meta Platforms,Inc. (n.d.)Pressable,TextInput,Images,ScrollView,StyleSheet,View. React Native. Available at: https://reactnative.dev/docs/components-and-apis
//South African Revenue Service (2026) Other taxes. Available at: https://www.sars.gov.za/tax-types/other-taxes/

