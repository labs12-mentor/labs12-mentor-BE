module.exports = {
    getAllInvitations,
    addInvitation,
    getInvitation,
    register,
    registerWithGithub,
    deleteInvitation,
    removeInvitation
};
const Invitations = require('../database/helpers/invitations');
const Organizations = require('../database/helpers/organizations');
const Users = require('../database/helpers/users');
const { authValidator } = require('../validators');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
require('../middleware/passport');

const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.MAIL,
    to: '',
    subject: '',
    html: ''
}

async function getAllInvitations(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_invitations = await Invitations.getInvitations();

        if (current_user.role !== 'ADMINISTRATOR') {
            const invitations = all_invitations.filter((elem) => {
                return elem.organization_id === current_user.organization_id;
            });
            return await res.status(200).json(invitations);
        }
        return await res.status(200).json(all_invitations);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addInvitation(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const invitationData = ({ organization_id, user_id, role, email, name } = req.body);
        const organization = await Organizations.getOrganizationById(organization_id);

        const {id} = await Invitations.insertInvitation(invitationData);
        await smtpTransport.sendMail({
            ...mailOptions,
            // to: email,
            to: email,
            subject: `${name}, you are invited to join ${organization.name} @ MentorMatch!`,
            html: `
                <h1>Hello from MentorMatch, ${name}!</h1>
                <p>Your peers from ${organization.name} are waiting here for you! Click the link below to join MentorMatch!
                <a href="https://mentormatch.netlify.com/invitation/${id}">https://mentormatch.netlify.com/invitation/${id}</a>

                <h4>See you soon @ MentorMatch!</h4>
                <p>Team MentorMatch</p>
            `
        }, async (err, response) => {
            if(err) throw err;
            await smtpTransport.close();
        })
        return await res.status(201).json({ id, ...invitationData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getInvitation(req, res) {
    try {
        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if (invitation === null || invitation.deleted)
            return await res.status(404).json({ error: 'Invitation not found!' });
        return await res.status(200).json(invitation);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteInvitation(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (invitation === undefined)
                return await res.status(404).json({ error: 'Invitation not found!' });
        } else {
            if (invitation === undefined || invitation.deleted)
                return await res.status(404).json({ error: 'Invitation not found!' });
            if (
                current_user.organization_id !== invitation.organization_id ||
                current_user.id !== invitation.user_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await Invitations.deleteInvitation(req.params.invitation_id);
        return await res.status(200).json({ id: req.params.invitation_id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeInvitation(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (invitation === undefined)
                return await res.status(404).json({ error: 'Invitation not found!' });
        } else {
            if (invitation === undefined || invitation.deleted)
                return await res.status(404).json({ error: 'Invitation not found!' });
            if (
                current_user.organization_id !== invitation.organization_id ||
                current_user.id !== invitation.user_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await Invitations.removeInvitation(req.params.invitation_id);
        return await res.status(200).json({ id: req.params.invitation_id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function register(req, res) {
    const { user_email, user_password, user_first_name, user_last_name, user_street, user_country, user_state, user_city } = req.body;

    const invitationData = ({ organization_id, role } = await Invitations.getInvitationById(
        req.params.invitation_id
    ));


    let userData = {
        email: user_email,
        password: user_password,
        first_name: user_first_name,
        last_name: user_last_name,
        street: user_street,
        city: user_city,
        state: user_state,
        country: user_country,
        organization_id: invitationData.organization_id,
        role: invitationData.role
    };

    const validUser = await authValidator.validateUser(userData);
    if (!validUser) {
        return await res
            .status(400)
            .json({ error: 'Cannot register user - missing required fields!' });
    }

    if (await Users.getUserByEmail(userData.email)) {
        return await res.status(400).json({ error: 'User already exists!' });
    }

    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;

        await Users.insertUser(userData);

        return res.status(201).json({ message: 'User successfully registered!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function registerWithGithub(req, res) {
    const invitationId = req.params.invitation_id;
    return await passport.authenticate('github', {
        failureRedirect: '/',
        successRedirect: '/api',
        state: JSON.stringify({ invitation_id: invitationId })
    })(req, res);
}
