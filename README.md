HealthSoft API using Node, express, prisma and postgresql
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post(
'/login',
async (req: Request, res: Response, next: NextFunction) => {
try {
const { email, password } = req.body;
const user = await prisma.user.findOne({ where: { email } });
if (!user) {
throw new Error('Invalid email or password');
}

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ success: true, token });
    } catch (error) {
      next(error);
    }

}
);

// create new admin
router.post(
'/admins',
async (req: Request, res: Response, next: NextFunction) => {
try {
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password, 10);
const result = await prisma.admin.create({
data: { ...req.body, password: hashedPassword, role: 'admin' },
});

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }

}
);

// create new doctor
router.post(
'/doctors',
async (req: Request, res: Response, next: NextFunction) => {
try {
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password, 10);
const result = await prisma.doctor.create({
data: { ...req.body, password: hashedPassword, role: 'doctor' },
});

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }

}
);

// create new nurse
router.post(
'/nurses',
async (req: Request, res: Response, next: NextFunction) => {
try {
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password, 10);
const result = await prisma.nurse.create({
data: { ...req.body, password: hashedPassword, role: 'nurse' },
});

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }

}
);

//////////////////////

router.post(
'/login',
async (req: Request, res: Response, next: NextFunction) => {
try {
const { email, password } = req.body;

      // query the appropriate table based on the user's role
      let user;
      const admin = await prisma.admin.findOne({ where: { email } });
      if (admin) {
        user = admin;
      } else {
        const doctor = await prisma.doctor.findOne({ where: { email } });
        if (doctor) {
          user = doctor;
        } else {
          const nurse = await prisma.nurse.findOne({ where: { email } });
          if (nurse) {
            user = nurse;
          }
        }
      }

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ success: true, token });
    } catch (error) {
      next(error);
    }

}
);

//////
router.post(
'/login',
async (req: Request, res: Response, next: NextFunction) => {
try {
const { email, password } = req.body;

      // query the appropriate table based on the user's role
      let user;
      const admins = await prisma.admin.findMany({ where: { email } });
      if (admins.length > 0) {
        user = admins[0];
      } else {
        const doctors = await prisma.doctor.findMany({ where: { email } });
        if (doctors.length > 0) {
          user = doctors[0];
        } else {
          const nurses = await prisma.nurse.findMany({ where: { email } });
          if (nurses.length > 0) {
            user = nurses[0];
          }
        }
      }

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ success: true, token });
    } catch (error) {
      next(error);
    }

}
);
