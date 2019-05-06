module.exports = {
    getAllInvitations,
    addInvitation,
    getInvitation,
    register,
    registerWithGithub,
    deleteInvitation,
    removeInvitation
}
const Invitations = require('../database/helpers/invitations');
const Users = require('../database/helpers/users');
const { authValidator } = require('../validators');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../middleware/passport');

async function getAllInvitations(req, res){
    try {
        const invitations = await Invitations.getInvitations();
        return await res.status(200).json(invitations);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addInvitation(req, res){
    try {
        const invitationData = {
            organization_id,
            user_id,
            role
        } = req.body;
        const id = await Invitations.insertInvitation(invitationData);
        return await res.status(200).json({
            message: 'Invitation successfully added!',
            id
        });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getInvitation(req, res){
    try {
        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if(invitation === null || invitation.deleted) return await res.status(404).json({ error: 'Invitation not found!' });
        return await res.status(200).json(invitation);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteInvitation(req, res){
    try {
        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if(invitation === null || invitation.deleted) return await res.status(404).json({ error: 'Invitation not found!' });
        await Invitations.deleteInvitation(req.params.invitation_id);
        return await res.status(200).json({ message: 'Successfully deleted an invitation!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeInvitation(req, res){
    try {
        const invitation = await Invitations.getInvitationById(req.params.invitation_id);
        if(invitation === null || invitation.deleted) return await res.status(404).json({ error: 'Invitation not found!' });
        await Invitations.removeInvitation(req.params.invitation_id);
        return await res.status(200).json({ message: 'Successfully removed an invitation!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function register(req, res){
    const {
        user_email,
        user_password,
        user_first_name,
        user_last_name
    } = req.body;

    const invitationData = {
        organization_id,
        role
    } = await Invitations.getInvitationById(req.params.invitation_id);

    let userData = {
        email: user_email,
        password: user_password,
        first_name: user_first_name,
        last_name: user_last_name,
        organization_id: invitationData.organization_id,
        role: invitationData.role
    }

    const validUser = await authValidator.validateUser(userData);
    if(!validUser){
        return await res
            .status(400)
            .json({ error: 'Cannot register user - missing required fields!' });
    }

    if(await Users.getUserByEmail(userData.email)){
        return await res
            .status(400)
            .json({ error: 'User already exists!' });
    }

    try {
        let hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;

        await Users.insertUser(userData);

        return res
            .status(201)
            .json({ message: 'User successfully registered!' });
    } catch(error) {
        return await res
            .status(500)
            .json({ error: error.message });
    }
}

async function registerWithGithub(req, res){
    const invitationId = req.params.invitation_id;
    return await passport.authenticate('github', { failureRedirect: '/', successRedirect: '/api', state: JSON.stringify({ invitation_id: invitationId })})(req, res);
}