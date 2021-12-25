const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('machleo')
		.setDescription('Thích machleo')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('mách gì nè')
				.setRequired(true)),
	async execute(message, client) {
		const machleomsg = message.options.get("message").value;
		await client.channels.cache.get(client.config.komubotrest.machleo_channel_id).send(machleomsg).catch(console.error);
		message.reply({ content: `\`✅\` Message sent to #macleo.`, ephemeral: true });        
	}			
};