import moment from 'moment-timezone';
import config from '../../config.cjs';
export default async function GroupParticipants(sock, { id, participants, action }) {
   try {
      const metadata = await sock.groupMetadata(id)

      // participants
      for (const jid of participants) {
         // get profile picture user
         let profile
         try {
            profile = await sock.profilePictureUrl(jid, "image")
         } catch {
            profile = "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu"
         }

         // action
         if (action == "add" && config.WELCOME ) {
           const userName = jid.split("@")[0];
                    const joinTime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
                    const joinDate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
                    const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `┌─❖
│「 𝗛𝗶  」
└┬❖ 「  @${userName}  」
   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
   │✑  *${metadata.subject}*
   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │✑ ${membersCount}th
   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : 
   │✑ ${joinTime} ${joinDate}
   └───────────────┈···▸▸>`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: metadata.subject,
                     sourceUrl: 'https://sid-bhai.vercel.app'
                  }
               }
            })
         } else if (action == "remove" && config.WELCOME ) {
           const userName = jid.split('@')[0];
                    const leaveTime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
                    const leaveDate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
                    const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `┌─❖
│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲  」
└┬❖ 「 @${userName}  」
   │✑  𝗟𝗲𝗳𝘁 
   │✑ ${metadata.subject}
   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │✑ ${membersCount}th
   │✑  𝗧𝗶𝗺𝗲 : 
   │✑  ${leaveTime} ${leaveDate}
   └───────────────┈···▸▸>`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Leave`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://sid-bhai.vercel.app'
                  }
               }
            })
         }
      }
   } catch (e) {
      throw e
   }
}
