import Attendant from '../models/attendant.model.js';

export const registerAttendant = async (req, res) => {
  const onboardingKey = req.headers['x-onboarding-key'];
  const expectedKey = process.env.ATTENDANT_ONBOARDING_KEY;

  if (!expectedKey) {
    return res.status(500).json({ msg: 'Attendant onboarding is not configured' });
  }

  if (!onboardingKey || onboardingKey !== expectedKey) {
    return res.status(403).json({ msg: 'Only developers can onboard attendants' });
  }

  const { name, email, password, hostelName } = req.body;

  try {
    if (!name || !email || !password || !hostelName) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const existingAttendant = await Attendant.findOne({ email });
    if (existingAttendant) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const attendant = await Attendant.create({
      name,
      email,
      password,
      hostelName: hostelName.toUpperCase(),
    });
    const token = attendant.createJWT();

    res.status(201).json({
      attendant: {
        _id: attendant._id,
        name: attendant.name,
        email: attendant.email,
        hostelName: attendant.hostelName,
        role: 'attendant'
      },
      token,
    });
  } catch (error) {
    console.log("REGISTRATION ERROR:", error); 
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const loginAttendant = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    const attendant = await Attendant.findOne({ email });
    if (!attendant) {
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await attendant.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const token = attendant.createJWT();

    res.status(200).json({
      attendant: {
        _id: attendant._id,
        name: attendant.name,
        email: attendant.email,
        hostelName: attendant.hostelName,
        role: 'attendant'
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};