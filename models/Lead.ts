
import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    niche: { type: String, required: false },
    message: { type: String, required: false },
    goals: { type: [String], default: [] },
    audience: { type: String, required: false },
    existingSite: { type: String, required: false },
    investmentAmount: { type: Number, required: false },
    references: { type: String, required: false },
    brandTone: { type: String, required: false },
    contentAck: { type: Boolean, default: false },
    contactMethod: { type: String, required: false },
    score: { type: Number, default: 0 },
    status: { type: String, enum: ['Hot', 'Warm', 'Cold', 'Unscored'], default: 'Unscored' },
    analysis: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
