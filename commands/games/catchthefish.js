const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "catchthefish",
    aliases: ['ctf'],
    description: 'Grab fish',
	cooldowns: 3000,
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_WEBHOOKS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const positions = {
			safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
			danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',
			win: '_ _           :crown:**You won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
			lose: '_ _           :skull:**You lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
		};

		let randomized = Math.floor(Math.random() * 2);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];
		let data = 0;

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'e',
						label: '\u200b',
						disabled: true,
					},
					{
						type: 2,
						style: 'PRIMARY',
						custom_id: String(Math.random()),
						emoji: { id: '890611575227023391' },
					},
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'ee',
						label: '\u200b',
						disabled: true,
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: `Catch 3 fishes to win!\n\n${randomPos}`,
			components: componentsArray,
		});

		const filter = (button => { return button.user.id === message.author.id; });
		const game = await message.channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		});

		function update(button) {
			randomized = Math.floor(Math.random() * 2);
			randomPos = positions[Object.keys(positions)[randomized]];

			if(data === 3) {
				gameEnded = true;
				game.stop();
				componentsArray[0].components[1].disabled = true;

				msg.edit({
					content: positions.win,
					components: componentsArray,
				});
				button.reply({ content: 'GG! You caught 3 fishes!' });
			}
			else if (data <= -9) {
				gameEnded = true;
				game.stop();
				componentsArray[0].components[1].disabled = true;

				msg.edit({
					content: positions.lose,
					components: componentsArray,
				});
				button.reply({ content: 'GG You lost XD' });
			}
			else {
				if(button) return button.deferUpdate();
				msg.edit({
					content: randomPos + `           **${data}**`,
					components: componentsArray,
				});
			}
		}

		setInterval(() => {
			if(gameEnded === false) return update();
		}, 2000);

		game.on('collect', async (button) => {
			if(randomized !== 0) {
				data -= 3;
				update(button);
			}
			else {
				data++;
				update(button);
			}
		});
    },
};