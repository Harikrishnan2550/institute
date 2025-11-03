export const getAdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to the Admin Dashboard",
      user: req.user,
      data: {
        stats: {
          totalPartners: 25,
          totalForms: 120,
          revenue: "₹1,20,000",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin dashboard" });
  }
};

export const getPartnerDashboard = async (req, res) => {
  try {
    res.status(200).json({
      message: `Welcome ${req.user.email}, this is your Partner Dashboard`,
      user: req.user,
      data: {
        stats: {
          leadsAssigned: 12,
          formsSubmitted: 8,
          earnings: "₹15,000",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching partner dashboard" });
  }
};
