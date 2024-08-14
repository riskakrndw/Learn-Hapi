// fungsi bernama mapDBToModel dan menerima parameter note objek dari database
// return objek note baru yang nama propertinya sudah disesuaikan/perbaiki
const mapDBToModel = ({ id, title, body, tags, created_at, updated_at }) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
